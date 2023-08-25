"use client"
import { useContext, useRef } from "react"
import { TokenContext, textPopup } from "../layout"
import Card from "../components/Card"
import useFetch from "../hooks/useFetch"
import Grid from "../components/Grid"
import { contextChildrenData } from "../hooks/useContextMenu"
import { addArrayToQueue, play } from "../utils"
import { AlbumObject } from "../types"


export default function Albums(){
    const token = useContext(TokenContext)
    const albums = useFetch<Response>('https://api.spotify.com/v1/me/albums?limit=36')

    return (
        <div className="overflow-scroll overflow-x-hidden h-full" onScroll={albums.createScrollHandler(albums.last?.next)}>
            <h2 className="text-5xl m-6">Albums: </h2>
            <Grid>
                <>
                {
                    albums.data?.map(res => res.items.map((album:{album: AlbumObject}) => {
                        const contextChildren:contextChildrenData = {
                            "Open":{
                                type: "link",
                                href: '/album/'+ album.album.id,
                            },
                            "Play":{
                                type: "callback",
                                onClick() {
                                    play(token,album.album.uri)
                                }
                            },
                            "Add to queue": {
                                type: 'callback',
                                onClick() {
                                    addArrayToQueue(token,album.album.tracks.items.map(track => track.uri))
                                },
                            },
                            "break": {
                                type: "break"
                            },
                            "Copy link": {
                                type: "callback",
                                onClick: () => {
                                    navigator.clipboard.writeText(window.location.host + '/album/' + album.album.id)
                                    textPopup.new('Link copied to clipboard',4000)
                                },
                                icon: "share",
                            }
                        }
                        return (
                            <Card
                                token={token}
                                key={album.album.id}
                                contextChildrenData={contextChildren}
                                artists={album.album.artists}
                                uri={album.album.uri}
                                id={album.album.id}
                                img={album.album.images[1].url}
                                title={album.album.name}
                                link={"album/" + album.album.id}/>
                        )
                    }))
                }
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
    items: {
        added_at: string,
        album: AlbumObject
    }[]
}