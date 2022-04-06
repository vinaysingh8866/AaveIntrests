import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";
import ERC20 from '../contracts/ERC20.json'
import Image from "next/image";
type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};

const images = {
  "WMATIC":"https://cryptologos.cc/logos/polygon-matic-logo.svg",
  "MATIC":"https://cryptologos.cc/logos/polygon-matic-logo.svg",
  "WETH":"https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  "WBTC":"https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg",
  "DAI":"https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg",
  "USDT":"https://cryptologos.cc/logos/tether-usdt-logo.svg",
  "USDC":"https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
  "AAVE":"https://cryptologos.cc/logos/aave-aave-logo.svg",
  "BAL":"https://cryptologos.cc/logos/balancer-bal-logo.svg",
  "CRV":"https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg",
  "GHST":"https://wiki.aavegotchi.com/icons/ghst.svg",
  "LINK":"https://cryptologos.cc/logos/chainlink-link-logo.svg",
  "SUSHI":"https://cryptologos.cc/logos/sushiswap-sushi-logo.svg",
  

}

const TokenBalance = ({ tokenAddress, arOfBal, setArOfBal }) => {
  const [data, setData] = useState(null)
  const [sym, setSym] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer =  provider.getSigner();
    const contract = new Contract(tokenAddress, ERC20, provider);
    const balance =  contract.balanceOf(signer.getAddress());
    const symbol = contract.symbol()
    const decimals = contract.decimals()
    
    balance.then((res) => {
      decimals.then((resd)=>{
        const val = ethers.utils.formatUnits(res.toString(), resd.toString())
        setData(val)
        let artmp = arOfBal
        if(res.toString()!=NaN){
          artmp[tokenAddress] = ethers.utils.formatUnits(res.toString(), resd.toString())
        }
        
        })
      
    })
    symbol.then((result) => {
      setSym(result.toString())
    }).catch((err) => {
      console.log(err, tokenAddress)
    });
    
  }, [])


  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>

  return (
    <div className="flex flex-nowrap content-center text-left items-center w-64" style={{"marginLeft":"30%"}}>
      <img className="mx-4" src={images[sym]} width="20"></img>
      <div className="overflow-hidden">{data}</div>
       
    </div>
  );
};

export default TokenBalance;
