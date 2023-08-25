import { useEffect, useState } from "react"
import { msToMin, play } from "../utils"
import { SimplifiedTrackObject, TrackObject } from "../types"

export default function SongList({items,token,albumUri}:Props){
    const [saved,setSaved] = useState([false])
    useEffect(()=>{
        fetch("https://api.spotify.com/v1/me/tracks/contains?ids=" + items.map(el => el.id).join(","),{
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            },
        }).then(res => res.json()).then(res => {
            setSaved(res)
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div className="flex flex-col [&>*]:grid [&>*]:grid-cols-[2rem_2rem_auto_20rem_5rem_5rem] [&>*]:text-left mt-8">
            <div className="px-3">
                <p></p>
                <p className="text-right pr-3">#</p>
                <p>title:</p>
                <p>artists:</p>
                <p>length:</p>
            </div>
            {items.map((el,index) => {
                return <div tabIndex={0} key={el.id} className="hover:bg-[#252525] p-3 [&:hover>p]:opacity-100" onClick={() => {play(token,albumUri,el.uri)}}>
                    <p className="opacity-0"><i className="bi bi-play text-center block"></i></p>
                    <p className="text-right pr-2">{index + 1 + '.'}</p>
                    <p>{el.name}</p>
                    <p>{el.artists.map(el => el.name).join(", ")}</p>
                    <p>{msToMin(el.duration_ms)}</p>
                    <p>
                        {
                            saved[index] === true ? <button tabIndex={0} className="bi bi-heart-fill" onClick={(ev)=>{ev.stopPropagation();removeTrack(el.id)}}></button>
                            : <button tabIndex={0} className="bi bi-heart" onClick={(ev)=>{ev.stopPropagation();saveTrack(el.id)}}></button>
                        }
                    </p>   
                </div>
            })}
        </div>
    )

    function saveTrack(id:string){
        fetch("https://api.spotify.com/v1/me/tracks",{
            method:"PUT",
            headers:{
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                ids: [id]
            })
        }).then((res)=>{
            if(res.status == 200){
                const index = items.findIndex(el => {
                    return el.id == id
                })
                const newArr = [...saved]
                newArr[index] = true
                setSaved(newArr)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    function removeTrack(id:string){
        fetch("https://api.spotify.com/v1/me/tracks",{
            method:"DELETE",
            headers:{
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                ids: [id]
            })
        }).then((res)=>{
            if(res.status == 200){
                const index = items.findIndex(el => {
                    return el.id == id
                })
                const newArr = [...saved]
                newArr[index] = false
                setSaved(newArr)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

type Props = {
    items: TrackObject[] | SimplifiedTrackObject[],
    token:string,
    albumUri: string
}