import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        try {
            const resp = await axios.post(
                "https://lexicon.dothq.co/translate", 
                req.body
            )
    
            res.json(resp.data);
        } catch(e) {
            res.json(e.response.data);
        }
    }
}