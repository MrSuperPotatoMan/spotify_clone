"use client"
import { useEffect, useContext, useState, UIEvent } from "react";
import {TokenContext} from '../../layout'
import Card from "@/app/components/Card";
import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { ArtistObject, SimplifiedAlbumObject } from "@/app/types";
import useFetch from "@/app/hooks/useFetch";

export default function ArtistPage({params:{id}}:{params:{id:string}}){
    const token = useContext(TokenContext);
    const [artist, setArtist] = useState<ArtistObject>()
    useEffect(() => {
        fetch("https://api.spotify.com/v1/artists/" + id,{
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            }
        }).then(res => {
            if(res.status === 200) return res.json()
            throw res
        }).then((res:ArtistObject) => {
            setArtist(res)
        }).catch(err => {
            console.log(err)
        })
    },[])
    
    const albums = useFetch<Response>(`https://api.spotify.com/v1/artists/${id}/albums`)

    return (
        <div onScroll={albums.createScrollHandler(albums.last?.next)}>
            { 
                artist ? <>
                    <Header title={artist.name} imgSrc={artist.images[0].url}>
                        {artist.genres.map(res =>  res.charAt(0).toUpperCase() + res.slice(1)).join(', ')}
                    </Header>
                </>: <div></div>
            }
            {/* <div className="flex flex-row m-3">
                <button className="px-3 m-1 rounded-full bg-primary text-black">All</button>
                <button className="px-3 m-1 rounded-full">Albums</button>
                <button className="px-3 m-1 rounded-full">Singles</button>
            </div> */}
            <Grid>
                <>
                {albums.data?.map(res => res.items.map(el => {
                    return <Card contextChildrenData={{}} key={el.id} id={el.id} title={el.name} token={token} uri={el.uri} img={el.images[1].url} link={"/album/" + el.id} />
                }))}
                </>
            </Grid>
        </div>
    )
}
type Response = {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: SimplifiedAlbumObject[]
}