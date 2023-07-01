// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extract } from '@extractus/article-extractor';

type Data = {
  name: string
}

export default async function parserHandler(req: NextApiRequest,res: NextApiResponse<any>){
    let websiteUrl=req.body.websiteUrl;
// here we use top-level await, assume current platform supports it
    try {
        const article = await extract(websiteUrl);
        console.log(article)
        res.status(200).json(article);
    } catch (err) {
        console.error(err);
        res.status(400).json({ name: 'John Doe' });
    }
}




