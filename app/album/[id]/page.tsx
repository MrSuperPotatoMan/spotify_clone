"use client"
import { useEffect, useContext, useState } from "react"
import { TokenContext } from "../../layout"
import { AlbumObject } from "@/app/types"
import { makeArtistsListFromObject } from "@/app/utils"
import SongList from "@/app/components/SongList"
import Header from "@/app/components/Header"

export default function({params}:{params:{id:string}}){
    const token = useContext(TokenContext)
    const [album,setAlbum] = useState<AlbumObject>()
    
    useEffect(()=>{
        fetch("https://api.spotify.com/v1/albums/" + params.id,{
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            }
        }).then(res => {
            if(res.status === 200) return res.json()
            throw res
        }).then((res:AlbumObject) => {
            setAlbum(res)
        }).catch(err => {
            console.log(err)
        })
    },[])

    return (
        <div>
            {album?
                <>
                <Header title={album.name} year={new Date(Date.parse(album.release_date)).getFullYear()} imgSrc={album.images[0].url}>
                    <span className="text-font-gray text-xl">{makeArtistsListFromObject(album)}</span>
                </Header>
                <SongList token={token} items={album.tracks.items} albumUri={album.uri}/>
                </>
            : <div></div>}
        </div>
    )

}