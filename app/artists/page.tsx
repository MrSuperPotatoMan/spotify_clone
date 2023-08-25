"use client"
import { useContext  } from "react"
import { TokenContext } from "../layout"
import Card from "../components/Card"
import useFetch from "../hooks/useFetch"
import Grid from "../components/Grid"
import { ArtistObject } from "../types"

export default function Artists(){
    const token = useContext(TokenContext)
    const data = useFetch<Response>('https://api.spotify.com/v1/me/following?type=artist&limit=36')
    return (
        <div className="overflow-scroll overflow-x-hidden h-full" onScroll={data.createScrollHandler(data.last?.artists.next)}>
            <h2 className="text-5xl m-6">Artists: </h2>
            <Grid>
                <>
                {
                    data.data?.map(res => res.artists.items.map(artist => {
                        return (
                            <Card contextChildrenData={{}} key={artist.id} token={token} uri={artist.uri} id={artist.id} img={artist.images[1].url} title={artist.name} link={"artist/" + artist.id}/>
                        )
                    }))
                }
                </>
            </Grid>
            </div>
    )
}

type Response = {
    artists: {
        href: string,
        limit: number,
        next: string,
        total: number,
        cursors: {
            after: string,
            before: string
        },
        items: ArtistObject[]
    }
}