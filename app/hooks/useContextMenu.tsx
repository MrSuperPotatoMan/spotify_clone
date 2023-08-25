"use client"
import { CSSProperties, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export type contextChildrenData = {
    [index: string]:{
        type: "link",
        icon?: string,
        href: string
    } | {
        type: "callback"
        icon?: string,
        onClick: () => void
    } | {
        type: "break"
    }
}

function contextMenu(){
    return {
        Element: <Element/>,

        open(ev: React.MouseEvent, children: contextChildrenData) {
            ev.preventDefault()
            document.dispatchEvent(new CustomEvent('contextMenuOpen',{detail:{children,pageX:ev.pageX,pageY:ev.pageY}}))
        },
    }



    function Element(){
        document.addEventListener('contextMenuOpen',({detail}: CustomEventInit) => {
            setContextChildren(detail.children);
            setContextStyle({...contextStyle,display:'block',top:detail.pageY,left:detail.pageX});
        })

        const [contextChildren,setContextChildren] = useState<contextChildrenData | undefined>()
        const [contextStyle, setContextStyle] = useState<CSSProperties>({display:"none"})
        const contextRef = useRef<HTMLDivElement>(null)
        const router = useRouter()
    
        useEffect(() => {
            contextRef.current?.focus();
        },[contextStyle])

    
        return <div
            ref={contextRef}
            className="fixed w-40 z-50 bg-base-gray-lighter [&>*]:cursor-pointer shadow-default rounded-md [&>*]:p-2 [&>div:hover]:underline text-md flex flex-col"
            style={contextStyle}
            onBlur={handleBlur}
            tabIndex={1}
        >
            {contextChildren && createChildren(contextChildren)}
        </div>

        
        function handleBlur(){
            setContextStyle({...contextStyle,display: 'none'})
        }

        function createChildren(data:contextChildrenData){
            let a = 0;
            const children = []
            for(const key in data){
                const childData = data[key]
                const handleClick = (ev:React.MouseEvent) => {
                    ev.preventDefault()
                    handleBlur()
                    if(childData.type === 'link'){
                        router.push(childData.href)
                    }else if(childData.type === 'callback'){
                        childData.onClick()
                    }
                }
                switch(childData.type){
                    case "link":
                        children.push(<div onClick={handleClick} className="flex flex-row justify-between" key={key}>
                            {key} {childData.icon? <i className={"bi-" + childData.icon}></i>: null}
                        </div>)
                        break
                    case "callback":
                        children.push(<div className="flex flex-row justify-between" key={key} onClick={handleClick}>
                            {key} {childData.icon? <i className={"bi-" + childData.icon}></i>: null}
                        </div>)
                        break
                    case "break":
                        children.push(<hr key={key + a} className="!p-0"/>)
                        break
                }
                a++
            }
            return children
        }
    }
}

export default contextMenu