import { makeArtistsList, play } from "../utils"
import Link from "next/link"
import { contextMenu } from "../layout"
import { contextChildrenData } from "../hooks/useContextMenu"

export default function Card({img,title,artists,link,offsetUri,token,uri,contextChildrenData}:Props){

    return (
        <div className="[&:hover>div>div]:opacity-100 [&:hover>div>div]:translate-x-0 [&:hover>div>div]:translate-y-0" onContextMenu={(ev) => {contextMenu.open(ev,contextChildrenData)}}>
            <div className="relative overflow-hidden cursor-pointer aspect-square bg-black">
                <Link href={link}>
                    <img src={img} />
                </Link>
                <div className="absolute bottom-0 right-0 rounded-[100%_0_0_0] bg-primary w-20 h-20 flex justify-center items-center opacity-0 transition-all translate-x-full translate-y-full hover:scale-125" onClick={()=>{play(token,uri,offsetUri)}}>
                    <i className="bi bi-play text-3xl relative top-[0.5rem] left-[0.4rem]"></i>
                </div>
            </div>
            <Link href={link}>
                <p className="hover:underline cursor-pointer w-full line-clamp-2">
                    {title}
                </p>
            </Link>
            <p className="text-gray-500 text-sm cursor-default">
                {
                    artists && makeArtistsList(artists)
                }
            </p>
        </div>
    )
}
type Props = {
    id: string,
    img: string,
    title: string,
    artists?: {
        id: string,
        name: string
    }[],
    link: string,
    token: string,
    uri: string,
    offsetUri?: string,
    contextChildrenData: contextChildrenData
}