"use client"
import { useContext, useEffect, useState, UIEvent } from "react"
import { TokenContext } from "../layout"


function useFetch<T = any>(endPoint: string) {
    const token = useContext(TokenContext)
    const [data, setData] = useState<T[]>()
    const [isFetching,setIsFetching] = useState(false)

    useEffect(() => {
        fetch(endPoint,{
            method: "GET",
            headers:{
                Authorization: 'Bearer ' + token,
            }
        }).then(res => res.json()).then((res: T) => {
            setData([res])
        })
    },[endPoint])

    function next(nextEndPoint: string){
        if(!isFetching){
            setIsFetching(true)
            fetch(nextEndPoint,{
                method: "GET",
                headers:{
                    Authorization: 'Bearer ' + token,
                }
            }).then(res => res.json()).then((res: T) => {
                if(data){
                    const dataCopy: T[] = [...data];
                    dataCopy.push(res)
                    setData(dataCopy)
                }
                setIsFetching(false)
            }).catch(err => {
                console.log(err)
                setIsFetching(false)
            })

        }
    }
    
    return {
        data: data,
        createScrollHandler: (nextLink: string | undefined | null) => {
            return function handleScroll(ev:UIEvent<HTMLDivElement>){
                const div = ev.target as HTMLDivElement
                const scrollBottom = (div.scrollHeight - div.offsetHeight) -  div.scrollTop
                if(scrollBottom < 1000){
                    if(nextLink){
                        next(nextLink)
                    }
                }
            }
        },
        last: data?.[data.length - 1]
    }
}

export default useFetch