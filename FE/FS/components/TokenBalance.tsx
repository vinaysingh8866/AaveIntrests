import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";
import ERC20 from '../contracts/ERC20.json'
type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};


const TokenBalance = ({ tokenAddress }) => {
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
    balance.then((res) => {
      setData(res.toString())
      
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
    <p>
      {`${sym} Balance`}: {data}
    </p>
  );
};

export default TokenBalance;
