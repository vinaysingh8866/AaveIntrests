import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { ethers } from "ethers";
import { text } from "stream/consumers";
import Addresses from "../adresses";
import { Web3Provider } from "@ethersproject/providers";
import Balances from "../components/Balances";
import InterestMapper from "../components/IntrestMapper";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";




const Home = () => {
  let provider:Web3Provider;
  
  let balancesView;
  const [balance, setBalance] = useState("0");
  const [chainId, setChainId] = useState(0);
  const [coinAdd, setCoinAdd] = useState([]);
  
  async function test(){
    provider = new ethers.providers.Web3Provider(window.ethereum)
    const add = await provider.send("eth_requestAccounts", []);
    const network = await provider.getNetwork()
    const signer = provider.getSigner();
    const bal = await provider.getBalance(signer.getAddress())
    setBalance(ethers.utils.formatEther(bal.toString()))
    setChainId(network.chainId)
    console.log(typeof(Addresses[chainId]))
    //setCoinAdd(Addresses[chainId])
  }
  
  
  useEffect(() => {
   test() 
   
  })

  return (
    <div className="bg-white main-page">
      <Head>
        <title>DeFi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
               
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex gap-x-96 items-stretch justify-start">
              <div className="flex items-stretch text-pink-500 text-2xl">
              DeFi Tracker
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4 text-black">
                </div>
              </div> 
            </div>
          </div>
        </div>
      </nav>
        
      </header>

      <main className="">
        
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4 m-4 " style={{height:'90vh'}}>
        <div className="row-span-3 bg-pinnk-50 rounded-2xl text-center items-center content-center shadow-xl">
        <div className=" my-25 mx-6 grid grid-rows-4 gap-4 content-center items-center">
          <div className="">
            <div className="bg-pink-200 shadow-md h-20 w-20 rounded-full m-auto" onClick={()=>{test()}}>gh</div>
            <div>
            
            </div>
            {balance}
          </div>
          <Balances chainId={chainId} provider={provider}></Balances>
        </div>
        </div>
        <div className="col-span-2 row-span-1  w-full h-full">
          <div className="flex justify-around">
            <div className="bg-pink-50 rounded-2xl h-full w-full m-2 text-center" style={{height:'28vh'}}>
              Total USD
            </div>
            <div className="bg-pink-50 rounded-2xl h-full w-full m-2 text-center" style={{height:'28vh'}}>
              Defi Stake
            </div>
          </div>
        </div>
        <div className="m-2 col-span-2 row-span-2 rounded-2xl bg-pink-50 shadow-sm text-center">
            Top Protocols
            <div>
            <InterestMapper chainId={chainId}></InterestMapper>
            </div>
        </div>
      </div>
      </main>

      {/* <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style> */}
    </div>
  );
}

export default Home;
