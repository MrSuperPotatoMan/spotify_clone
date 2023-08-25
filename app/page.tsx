"use client"
import useFetch from "./hooks/useFetch";
import { TrackObject, ResponseProperties } from "./types";
import Card from "./components/Card";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./layout";


export default function(){
    const recentlyPlayed = useFetch<RecentlyPlayedResponse>('https://api.spotify.com/v1/me/player/recently-played')
    const token = useContext(TokenContext)

    return (
        <div>
            <div className="m-5">
                <h2 className="text-2xl">Recently listened</h2>
                <div className="overflow-x-auto">
                    <div className="flex flex-row w-max gap-8 my-2">
                        {
                            recentlyPlayed.data?.map(res => res.items.map(({track},index: number) => {
                                return <div key={"recent_" + index} className="w-40">
                                    <Card artists={track.artists} id={track.id} img={track.album.images[0].url} offsetUri={track.uri} uri={track.album.uri} title={track.name} token={token} link={'album/' + track.album.id} contextChildrenData={{}}/>
                                </div>
                            }))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

type RecentlyPlayedResponse = ResponseProperties<{
    track: TrackObject;
    played_at: string,
    context: {
        type: "artist" | "playlist" | "album" | "show",
        href: string,
        uri: string
    }
}>