export default function Grid({children}:{children: JSX.Element}){
    return (
        <div className="grid grid-cols-8 gap-8 m-5">
            {children}
        </div>
    )
}