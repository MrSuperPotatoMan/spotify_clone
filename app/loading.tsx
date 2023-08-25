"use client"

import { CircularProgress } from "@mui/material";

export default function Loading(){
    return (
        <div className="flex h-full w-full justify-center items-center">
            <CircularProgress/>
        </div>
    )
}