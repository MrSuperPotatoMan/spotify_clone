"use client"
import { useEffect, useContext, useState, Dispatch, SetStateAction  } from "react"
import { TokenContext } from "../../layout"
import { Playlist } from "@/app/types"
import { makeArtistsList} from "@/app/utils"
import SongList from "@/app/components/SongList"
import Header from "@/app/components/Header"

export default function({params}:{params:{id:string}}){
    const token = useContext(TokenContext)
    const [playlist,setPlaylist] = useState() as [undefined | Playlist, Dispatch<SetStateAction<Playlist>>]
    useEffect(()=>{
        fetch("https://api.spotify.com/v1/playlists/" + params.id,{
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            }
        }).then(res => {
            if(res.status === 200) return res.json()
            throw res
        }).then((res:Playlist) => {
            setPlaylist(res)
        }).catch(err => {
            console.log(err)
        })
    },[])
    console.log(playlist?.tracks)
    return (
        <div>
            {playlist?
                <>
                <Header title={playlist.name} imgSrc={playlist.images[0].url}>
                    <span className="text-font-gray text-xl">{}</span>
                </Header>
                <SongList token={token} items={playlist.tracks.items.map(el => el.track)} albumUri={playlist.uri}/>
                </>
            : <div></div>}
        </div>
    )
}