import Image from "next/image";
import { Component } from "react";
import Addresses from "../adresses";
import Interest from "./Interest";
import TokenBalance from "./TokenBalance";




const InterestMapper = ({chainId}) => {   
    let ar = []; 
    if(chainId!=0){
        ar = Object.values(Addresses[chainId]) 
    }
    
    return (
        <div className="bg-pink-100 shadow-lg row-span-3 rounded-md p-4 overflow-scroll" style={{height:'55vh'}}>

        <div className="grid grid-flow-row gap-4">
            <ul>
            {
                ar.map((x, i) =>{  
                    
                    return <Interest chainId={chainId} tokenAddress={x} key={i}></Interest>
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


export default InterestMapper
