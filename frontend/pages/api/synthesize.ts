import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        try {
            const base = new URL(`https://www.google.com/speech-api/v2/synthesize`);

            base.searchParams.set("enc", "mpeg");
            base.searchParams.set("client", "chromium");
            base.searchParams.set("key", "AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw");
            base.searchParams.set("lang", req.body.lang);
            base.searchParams.set("text", req.body.input.toString());
            base.searchParams.set("speed", 0.4.toString());
            base.searchParams.set("pitch", 0.5.toString());

            const resp = await axios.get(
                base.href, 
                { responseType: "arraybuffer" }
            )
    
            res.setHeader("content-type", "audio/mp3");
            res.end(Buffer.from(resp.data));
        } catch(e) {
            res.end("Failed.");
        }
    }
}