import type { NextApiRequest, NextApiResponse } from "next";
const Alpaca = require("@alpacahq/alpaca-trade-api");
const base = "https://data.alpaca.markets/v2";
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

console.log(API_KEY)
const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
});

type Data = {
    name: string,
    price: number,
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    var tradePrice: number = 0;
    async function getLatestTrade(symbol: string) {
        alpaca.getLatestTrade(symbol).then(
            (resp) => {console.log(resp); tradePrice = resp.Price; res.status(200).json({name: "hello", price: tradePrice});}
        ).catch(
            (err) => {console.log(err.error); res.status(400);}
        );
    }
    getLatestTrade("AAPL");
}
