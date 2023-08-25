import { Slider } from '@mui/material'
import {useEffect, useState} from 'react'

export default function Volume({player}:{player:Spotify.Player}){
    const [volume,setVolume] = useState(0)
    useEffect(()=>{
        player.getVolume().then(res => res * 100).then(setVolume)
    },[])
    return (
        <div className='grid grid-cols-[min-content_auto] items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                <path className={(volume < 66 ? "text-base-gray" : '') + " transition-colors"} d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                <path className={(volume < 33 ? "text-base-gray" : '') + " transition-colors"} d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                <path className={(volume == 0 ? "text-base-gray" : '') + " transition-colors"} d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"/>
                <path className='text-gray-300' d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
            </svg>
            <Slider valueLabelDisplay="auto" sx={{'& .MuiSlider-rail':{opacity:1,backgroundColor:'#d1d5db'}}} min={0} max={100} value={volume} onChange={(ev) => {
                const val = (ev.target as HTMLInputElement).value
                setVolume(parseInt(val));
                player.setVolume(parseInt(val) / 100)
            }}/>
        </div>
    )
}