import { NextResponse } from 'next/server';
import request from 'request'
import { headers } from 'next/dist/client/components/headers';
 
export async function GET() {
    let hd = headers()
    var client_id = process.env.CLIENT_ID;
    var client_secret = process.env.SECRET;

    var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
        grant_type: 'authorization_code',
        code: hd.get('code'),
        redirect_uri: "http://localhost:3000/"
    },
    json: true
    };
    return NextResponse.json(await new Promise((res)=>{
        request.post(authOptions, function(error, response, body) {
            res(body)
        });
    }))
}