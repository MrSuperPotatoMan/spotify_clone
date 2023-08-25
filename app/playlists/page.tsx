"use client"
import { UIEvent, useContext  } from "react"
import { TokenContext } from "../layout"
import Card from "../components/Card"
import useFetch from "../hooks/useFetch"
import Grid from "../components/Grid"
import { ResponseProperties, SimplifiedPlaylistObject } from "../types"

export default function Playlists(){
    const token = useContext(TokenContext)
    const data = useFetch<Response>('https://api.spotify.com/v1/me/playlists')

    return (
        <div className="overflow-scroll overflow-x-hidden h-full" onScroll={data.createScrollHandler(data.last?.next)}>
            <h2 className="text-5xl m-6">Playlists: </h2>
            <Grid>
                <>
                {
                    data.data?.map(res => res.items.map(playlist => {
                        return (
                            <Card key={playlist.id} token={token} id={playlist.id} img={playlist.images[0].url} title={playlist.name} uri={playlist.uri} link={'/playlist/' + playlist.id} />
                        )
                    }))
                }
                </>
            </Grid>
        </div>
    )
}

type Response = ResponseProperties<SimplifiedPlaylistObject>