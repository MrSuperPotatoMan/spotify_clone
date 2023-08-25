import { NextResponse } from 'next/server';
 
export async function GET() {
  const scope = [
    "user-library-read",
    "user-library-modify",
    "streaming",
    "app-remote-control",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
  ]
  return NextResponse.redirect(new URL(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&show_dialog=true&redirect_uri=http://localhost:3000/&scope=${scope.join(" ")}`))
}