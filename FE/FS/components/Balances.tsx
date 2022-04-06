import Image from "next/image";
import { Component, useState } from "react";
import Addresses from "../adresses";
import TokenBalance from "./TokenBalance";




const Balances = ({chainId,provider, arOfBal, setArOfBal}) => {   
    let ar = []; 

    if(chainId!=0){
        ar = Object.values(Addresses[chainId]) 
    }
    
    return (
        <div className="bg-pink-100 shadow-lg row-span-3 rounded-md p-4 text-l" style={{height:'66vh'}}>
        <div className="text-3xl">Balances</div>
        
        <div className="w-full my-4 bg-black h-1"></div>
        
        <div className="grid grid-flow-row gap-4 items-center text-center">
            
            {
                ar.map((x, i) =>{  
                    
                    return <TokenBalance tokenAddress={x} key={i} arOfBal={arOfBal} setArOfBal={setArOfBal}></TokenBalance>
                })
            }
            
            {/* <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div> */}
        </div>
        </div>
    )
}


export default Balances
