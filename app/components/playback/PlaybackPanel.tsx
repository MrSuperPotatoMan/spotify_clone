import { useState,useEffect,SetStateAction,Dispatch } from "react";
import Volume from "./Volume";
import Playback from "./Playback";
import { makeArtistsListFromObject } from "@/app/utils";
import Devices from "./Devices";
import { ArtistObject, EpisodeObject, TrackObject } from "@/app/types";

export default function PlaybackPanel({token}:{token:string}){
    
    const [player,setPlayer] = useState(undefined) as [Spotify.Player | undefined,Dispatch<SetStateAction<Spotify.Player | undefined>>]
    const [isPlaying,setIsPlaying] = useState(false);
    const [currentlyPlaying,setCurrentlyPlaying] = useState<CurrentlyPlayingTrack>()
    const [userSaved,setUserSaved] = useState(false)

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Colorify',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            setPlayer(player);
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener("player_state_changed",(res) => {
                setIsPlaying(!res.paused)
                getCurrentState()
            })

            player.connect()

            player.addListener('ready', ({ device_id }) => {
                // getCurrentState()
                transferPB(device_id).then(getCurrentState)
            });

            function getCurrentState(){
                fetch("https://api.spotify.com/v1/me/player/currently-playing",{
                    method: "GET",
                    headers:{
                        Authorization: 'Bearer ' + token
                    }
                }).then(res => {
                    if(res.status === 200) return res.json()
                    throw res
                }).then((res:CurrentlyPlayingTrack) => {
                    setCurrentlyPlaying(res);
                })
            }
        };
    }, []);

    function transferPB(id:string){
        return fetch("https://api.spotify.com/v1/me/player",{
            method:"PUT",
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                device_ids: [id]
            })
        })
    }
    // [x] save song button
    // [] intergration when saving track from diffrent component
    return (
    <div className="col-span-2 grid grid-cols-[30em_auto_20em] gap-8 items-center shadow-[0px_0px_10px_1px_black] z-10 relative">
        <div className="grid grid-cols-[128px_auto_min-content] items-center hover:bg-[#202020]">
            <img 
                src={currentlyPlaying?.item? getImageFromObject(currentlyPlaying?.item)[0].url : ""}
                height={128}
                width={128}
                className="p-2"
            />
            <div>
                <p>{currentlyPlaying?.item?.name}</p>
                <span className="text-gray-500 text-sm">
                    {currentlyPlaying?.item? makeArtistsListFromObject(currentlyPlaying?.item) : ""}
                </span>
            </div>
            {
                userSaved?
                <i
                    className="bi-heart-fill m-2 cursor-pointer"
                    onClick={(ev) => {ev.stopPropagation();saveRemove(currentlyPlaying?.item)}}
                ></i>
                :
                <i
                    className="bi-heart m-2 cursor-pointer"
                    onClick={(ev) => {ev.stopPropagation();saveRemove(currentlyPlaying?.item)}}
                ></i>
            }
        </div>
        <div className="grid grid-cols-12 grid-rows-2 mx-10 h-24 items-center text-2xl justify-items-center">
            <Button cb={() => {player?.previousTrack()}} icon="skip-start" className="text-right col-start-5 col-end-6"/>
            <Button cb={() => {player?.togglePlay()}} icon={isPlaying?"pause":"play"} className="col-start-6 col-end-8"/>
            <Button cb={() => {player?.nextTrack()}} icon="skip-end" className="text-left col-start-8 col-end-9"/>
            {player === undefined? '' : <Playback isPlaying={isPlaying} currentTime={currentlyPlaying?.progress_ms || 0} seek={pbCb} length={currentlyPlaying?.item?.duration_ms || 0}/>}
        </div>
        <div className="grid grid-cols-[auto_2rem] pr-8 gap-4">
            {player ? <Volume player={player}/>:<div></div>}
            <Devices/>
        </div>
    </div>
    )

    function Button({cb,icon,className}:{cb:()=>void,icon:string,className?:string}){
        return <button onClick={cb} className={className + " w-min"}><i className={"bi bi-" + icon}></i></button>
    }

    function pbCb(ms:number){
        return player?.seek(ms)
    }

    function saveRemove(object: TrackObject | EpisodeObject | null | undefined){
        if(!object) return
    
        fetch("https://api.spotify.com/v1/me/tracks",{
            method:"PUT",
            headers:{
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                ids: [object.id]
            })
        }).then((res)=>{
            if(res.status == 200){
                setUserSaved(!userSaved)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

type CurrentlyPlayingTrack = {
    device: {
        id: string | null,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: "computer" | "smartphone" | "speaker",
        volume_percent: number | null
    },
    repeat_state: "off" | "track" | "context",
    shuffle_state: boolean,
    context: {
        type: "artist" | "playlist" | "album" | "show",
        href: string,
        uri: string,
    } | null
    item: TrackObject | EpisodeObject | null
    timestamp: number,
    progress_ms: number,
    is_playing: boolean,
}

function getImageFromObject(object: TrackObject | ArtistObject | EpisodeObject){
    switch(object.type){
        case "artist":
            return object.images
        case "episode":
            return object.images
        case "track":
            return object.album.images
    }
}