"use client"
import { UIEvent, useContext  } from "react"
import { TokenContext } from "../layout"
import Card from "../components/Card"
import useFetch from "../hooks/useFetch"
import { ResponseProperties, SavedTrackObject } from "../types"
import Grid from "../components/Grid"

export default function Tracks(){
    const token = useContext(TokenContext)

    const data = useFetch<ResponseProperties<SavedTrackObject>>("https://api.spotify.com/v1/me/tracks?limit=36")

    return (
        <div className="overflow-scroll overflow-x-hidden h-full" onScroll={data.createScrollHandler(data.last?.next)}>
            <h2 className="text-5xl m-6">Tracks: </h2>
            <Grid>
                <>
                {
                    data.data?.map(res => res.items.map(trackRes => {
                        const track = trackRes.track
                        return (
                            <Card key={track.id} token={token} uri={track.album.uri} offsetUri={track.uri} id={track.id} img={track.album.images[1].url} title={track.name} link={"/album/" + track.album.id}/>
                        )
                    }))
                }
                </>
            </Grid>
        </div>
    )

    function handleScroll(ev:UIEvent<HTMLDivElement>){
        const div = ev.target as HTMLDivElement
        const scrollBottom = (div.scrollHeight - div.offsetHeight) -  div.scrollTop
        if(scrollBottom < 1000){
            data.next?.()
        }
    }
}