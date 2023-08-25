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
        grant_type: 'refresh_token',
        refresh_token: hd.get('refresh_token')
    },
    json: true
    };
    return NextResponse.json(await new Promise((res)=>{
        request.post(authOptions, function(error, response, body) {
            if(response.statusCode === 200){
                res(body)
            }else{
                console.log("error")
                console.log(error)
                console.log("body")
                console.log(body)
                console.log("response")
                console.log(response)
                res(error)
            }
        });
    }))
}
