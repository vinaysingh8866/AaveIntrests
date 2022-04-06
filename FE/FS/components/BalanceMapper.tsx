import Image from "next/image";
import { Component, useEffect, useState } from "react";
import Addresses from "../adresses";
import Interest from "./Interest";
import TokenBalance from "./TokenBalance";
import TotalUSD from "./TotalUSD";




const BalanceMapper = ({chainId , arOfBal, arOfPrice, setArOfPrice}) => {   
    let ar = []; 
     
    //const [arOf]
    if(chainId!=0){
        ar = Object.values(Addresses[chainId]) 
    }
    
    
    useEffect(() => {
      console.log(arOfBal)
      console.log(arOfPrice)
    }, [])
     
    
    return (
        <div className=" row-span-3 p-4 overflow-scroll" style={{height:'26vh'}}>

        <div className="grid grid-flow-row gap-4">
            <div >
            
            {
                ar.map((x, i) =>{  
                    return <TotalUSD chainId={chainId} tokenAddress={x} key={i} arOfPrice={arOfPrice} setArOfPrice={setArOfPrice} ></TotalUSD>
                })
            }
            </div>
            {/* <div>{Object.keys(arOfBal).map((x,i) => {
                return <div key={i}>{arOfPrice[x]}</div>
            })}</div> */}
            {/* <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div>
            <div className="text-center content-center grid grid-cols-3 gap-2"><div><Image className="max-w-sm p-4 rounded-full"  height={40} width={40} alt="" src={"https://cdn.iconscout.com/icon/free/png-256/bitcoin-3629833-3030592.png"}></Image></div><div className="col-span-2 my-2">0.001 BTC</div></div> */}
        </div>
        </div>
    )
}


export default BalanceMapper
