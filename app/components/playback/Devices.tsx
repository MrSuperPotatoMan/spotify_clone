import { useContext, useEffect, useState } from "react"
import { TokenContext } from "@/app/layout"
import { CircularProgress, Grow } from "@mui/material"

export default function({}:{}){
    const [devicesShown,setDevicesShown] = useState(false)
    const [deviceList, setDeviceList] = useState<Devices>()
    const token = useContext(TokenContext)

    return (
        <>
        <button className="bi bi-laptop text-2xl text-center" onClick={handleToggleDevices}></button>
        {devicesShown && <div className="absolute -top-[120%] h-32 w-72">
            <Grow in={devicesShown}>
                <div className="w-72 h-full bg-base-gray-lighter shadow-default rounded-md flex flex-col overflow-auto">
                    {
                        deviceList?
                        deviceList.devices.map(device => {
                            return <button onClick={() => handleTransferPlayback(device.id)} className="text-left p-2" key={device.id}>
                                <MakeIcon type={device.type}/> {device.name}
                                {device.is_active && <i className="bi bi-dot text-center text-primary">current</i>}
                            </button>
                        }):
                        <CircularProgress className="m-auto"/>
                    }
                </div>
            </Grow>
        </div>}
        </>
    )
    function handleToggleDevices(){
        if(devicesShown){
            setDevicesShown(false)
            setDeviceList(undefined)
        }else{
            getDevices()?.then(() => {
                setDevicesShown(true)
            })
        }
    }

    function MakeIcon({type}:{type:"Computer" | "Smartphone" | "Speaker"}){
        switch(type){
            case "Computer":
            return <i className="bi bi-laptop"></i>
            case "Smartphone":
            return <i className="bi bi-phone"></i>
            case "Speaker":
            return <i className="bi bi-speaker"></i>
        }
    }

    function handleTransferPlayback(id:string){
        fetch("https://api.spotify.com/v1/me/player",{
            method:"PUT",
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                device_ids: [id]
            })
        }).then(getDevices)
    }

    function getDevices(){
        if(!token) return
        return fetch("https://api.spotify.com/v1/me/player/devices",{
            method:"GET",
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => res.json()).then((res:Devices) => {
            setDeviceList(res)
        })
    }
}

type Devices = {
    devices: {
        id: string,
        is_active: boolean,
        name: string,
        type: "Computer" | "Smartphone" | "Speaker"
    }[]
}