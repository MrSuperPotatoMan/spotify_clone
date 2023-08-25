import { Slider } from "@mui/material"
import { useEffect, useState,SetStateAction,Dispatch } from 'react'
import { msToMin } from "../../utils";

export default function Playback({length,seek,isPlaying,currentTime}:{length:number,seek:(ms:number)=>Promise<void> | undefined,isPlaying:boolean,currentTime:number}){
    const [intervalId,setIntervalId] = useState() as [NodeJS.Timer | undefined,Dispatch<SetStateAction<NodeJS.Timer>>]
    const [value,setValue] = useState(currentTime);
    useEffect(newInt,[isPlaying])
    useEffect(()=>{
        setValue(currentTime)
    },[currentTime])

    return(<>
        <span className="cols-start-1 col-end-2 text-base">{msToMin(value)}</span>
            <Slider slotProps={{input:{id:'playback'}}} className="col-start-2 col-end-12" onChange={handleChange} onChangeCommitted={handleCommit} value={value} min={0} max={length}/>
        <span className="cols-start-12 col-end-13 text-base">{msToMin(length)}</span>
    </>)

    function handleChange(ev:Event){
        clearInterval(intervalId);
        const v = parseInt(((ev.target as HTMLInputElement).value));
        setValue(v);
    }
    function handleCommit(){
        const pb = document.getElementById('playback') as HTMLInputElement
        setValue(parseInt(pb.value))
        seek(parseInt(pb.value))?.then(()=>{
            newInt();
        })
    }
    function newInt(){
        clearInterval(intervalId)
        if(!isPlaying) return
        const int = setInterval(()=>{
            setValue((value) => value + 1000);
        },1000)
        setIntervalId(int)
    }
}