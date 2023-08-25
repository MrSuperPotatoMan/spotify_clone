"use client"
import React, { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../layout'
import useFetch from '../hooks/useFetch'
import Card from '../components/Card'
import { ResponseProperties, SimplifiedAlbumObject, TrackObject } from '../types'

type Props = {}

function page({}: Props) {
    const [query,setQuery] = useState('')
    const [categories, setCategories] = useState({album:false, artist:false, playlist:false, track:false, show:false, episode:false})
    const token = useContext(TokenContext)

    
    const albums = useFetch<{albums: ResponseProperties<SimplifiedAlbumObject>}>('https://api.spotify.com/v1/search?q=' + query.replaceAll(' ','%20') + '&type=album&limit=8')
    const tracks = useFetch<{tracks: ResponseProperties<TrackObject>}>('https://api.spotify.com/v1/search?q=' + query.replaceAll(' ','%20') + '&type=track&limit=8')
    
    console.log(albums)
    return (
        <div className="overflow-scroll overflow-x-hidden h-full">
            <input spellCheck="false" value={query} onInput={handleInput} type='text' placeholder='search' className='bg-[#272727] outline-none m-6 p-2 text-2xl rounded-md'/>
            <div className="m-5 overflow-x-hidden">
                {
                    albums.data?.[0].albums &&
                    <Wrapper title='Albums:'>
                        {
                            albums.data.map(res => res.albums?.items.map((el) => {
                                return <Card key={el.id} link={'/album/' + el.id} img={el.images[1].url} token={token} id={el.id} uri={el.uri} title={el.name} />
                            }))
                        }
                    </Wrapper>
                }
                {
                    tracks.data?.[0].tracks &&
                    <Wrapper title='Tracks:'>
                        {
                            tracks.data.map(res => res.tracks?.items?.map((el) => {
                                return <Card key={el.id} link={'/album/' + el.album.id} offsetUri={el.uri} img={el.album.images[1].url} token={token} id={el.id} uri={el.album.uri} title={el.name} />
                            }))
                        }
                    </Wrapper>
                }
            </div>
        </div>
    )

    function handleInput(ev:React.FormEvent<HTMLInputElement>){
        setQuery((ev.target as HTMLInputElement).value)
    }

    function Wrapper({children,title}:{children:React.ReactNode,title:string}){
        return (
            <div className='overflow-x-auto'>
                <p className='text-2xl border-b-font-gray border-b-2 inline-block my-4'>{title}</p>
                <div className='grid grid-cols-8 gap-8'>
                    {children}
                </div>
            </div>
        )
    }
}

export default page
