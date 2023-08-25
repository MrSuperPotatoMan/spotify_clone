import { useState, useEffect, useRef } from "react"
import { Grow } from "@mui/material";

export default function(){

    return {
        Element: <Element/>,
        new(text: string, time: number = 5000){
            document.dispatchEvent(new CustomEvent('textPopup',{detail:{text, time}}))
        }
    }

    function Element(){
        document.addEventListener("textPopup",(ev:CustomEventInit) => {
            setStack([...stack,{text: ev.detail.text,time: ev.detail.time}])
            setHidden(false)
        })
        const [hidden,setHidden] = useState(true);
        const [stack,setStack] = useState<PopupInfo[]>([])
        const [executing, setExecuting] = useState(false)
        const [text,setText] = useState('')
        const ref = useRef<HTMLDivElement>(null)
        useEffect(() => {
            if(executing) return
            if(stack.length === 0) return
            const current = stack[0]
            setExecuting(true)
            setText(current.text)
            setHidden(false);
    
            const copy = {...stack[0]}
            ref.current?.animate([{width: '100%'},{width: '0%'}],{
                duration:copy.time,
                easing: "ease-out",
                fill: "forwards"
            }).finished.then(() => {
                setHidden(true);
                setTimeout(() => {
                    setExecuting(false)
                    setStack(a => a.splice(1,a.length))
                },800)
            })
        },[stack])
        
        return <Grow in={!hidden}>
            <div className="fixed z-40 bottom-36 left-[calc(50%-9rem)] w-72 rounded-md bg-base-gray-lighter shadow-default overflow-hidden">
                <p className="px-10 py-8 text-center">{text}</p>
                <div ref={ref} className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>
            </div>
        </Grow>
    }
}

type PopupInfo = {
    time: number,
    text: string,
}