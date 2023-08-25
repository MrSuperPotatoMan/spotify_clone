import Link from "next/link";
import { TrackObject, EpisodeObject, AlbumObject } from "./types";

export function makeArtistsList(artists:{id:string,name:string}[]){
    if(artists.length == 0) return ''
    return artists.map<React.ReactNode>((el) => {
        return (
            <Link href={'artist/' + el.id} key={el.id}>
                <span key={el.id} className="hover:underline cursor-pointer">{el.name}</span>
            </Link>
        )
    }).reduce((prev, curr) => [prev, ', ', curr])
}

export function makeArtistsListFromObject(object: TrackObject | EpisodeObject | AlbumObject){
    switch(object.type){
        case "track":
            return makeArtistsList(object.artists)
        case "album":
            return makeArtistsList(object.artists)
        case "episode":
            return <Link href={"/"}>{object.show.name}</Link> as React.ReactNode
    }
}

export function msToMin(ms:number){
    const minutes = Math.floor(ms/1000/60);
    const sec = Math.floor(ms/1000 - minutes * 60)
    return minutes + ":"+ (sec < 10? "0":'') + sec
}

export function play(token: string,uri: string, offset?: string){
    fetch("https://api.spotify.com/v1/me/player/play",{
        method: "PUT",
        headers:{
            Authorization: 'Bearer ' + token
        },
        body:JSON.stringify({
            context_uri: uri,
            offset: offset? {uri:offset}: {position:0}
        })
    })
}

export function addToQueue(token: string,uri: string){
    return fetch("https://api.spotify.com/v1/me/player/queue?uri=" + uri,{
        method: "POST",
        headers:{
            Authorization: 'Bearer ' + token
        },
    })
}

export async function addArrayToQueue(token: string,uris: string[]){
    // [] popup showing progres off adding to queue
    for(let i = 0; i< uris.length;i++){
        await new Promise<boolean>(res => {
            setTimeout(() => {
                addToQueue(token,uris[i]).then(() => {
                    res(true)
                })
            },500)
        })
    }
}