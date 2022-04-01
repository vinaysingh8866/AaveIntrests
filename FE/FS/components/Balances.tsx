import Image from "next/image";
import { Component } from "react";
import Addresses from "../adresses";
import TokenBalance from "./TokenBalance";




const Balances = ({chainId,provider}) => {   
    let ar = []; 
    if(chainId!=0){
        ar = Object.values(Addresses[chainId]) 
    }
    
    return (
        <div className="bg-pink-100 shadow-lg row-span-3 rounded-md p-4" style={{height:'66vh'}}>
        Balances
        <div className="grid grid-flow-row gap-4">
            <ul>
            {
                ar.map((x, i) =>{  
                    console.log(i)
                    return <TokenBalance provider={provider} tokenAddress={x} key={i}></TokenBalance>
                })
            }
            </ul>
            {/* <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div> */}
        </div>
        </div>
    )
}


export default Balances
