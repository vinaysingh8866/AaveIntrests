import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import ERC20 from '../contracts/ERC20.json'
import io from 'socket.io-client';
import PriceAddresses from "../addressesPrices";
const TotalUSD = ({ chainId,tokenAddress, arOfPrice, setArOfPrice, calculateTotal }) => {
   const [price, setPrice] = useState("")
  

  useEffect(() => {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer =  provider.getSigner();

    async function getData(provider, signer, cAdd){
        // const newSocket = io(`http://${window.location.hostname}:8080`);

        const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
        
        console.log(cAdd)

        if(cAdd!=undefined){
            let ar = arOfPrice
            let contr = new ethers.Contract(cAdd, aggregatorV3InterfaceABI, provider);
            let val = await contr.latestRoundData()
            let decimals = await contr.decimals()
            let price = ethers.utils.formatUnits(val['answer'].toString(), decimals)
            console.log(val['answer'].toString())
            ar[tokenAddress] = price.toString()
            setArOfPrice(ar)
            setPrice(price.toString())
            calculateTotal()
        }
        
        // const bal = await contr.getReserveData(tokenAddress);
        // const userBalance = await contr.getUserReserveData(tokenAddress, signer.getAddress());
        // setUserBal(userBalance['currentATokenBalance'].toString())
        // setInterestLending(Math.round(bal['liquidityRate'].toString() / 1e25))
        // setIntrestBorrow(Math.round(bal['variableBorrowRate'].toString() / 1e25))
        // newSocket.emit("set-interest",tokenAddress, Math.round(bal['variableBorrowRate'].toString() / 1e25), Math.round(bal['liquidityRate'].toString() / 1e25))
        //console.log("data emmitted")
        // const Web3 = require("web3") // for nodejs only
        // const web3 = new Web3("https://kovan.infura.io/v3/<infura_project_id>")
        // const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
        // const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
        // priceFeed.methods.latestRoundData().call()
        // .then((roundData) => {
        //     console.log("Latest Round Data", roundData)
        // })
    }
    const providerPoly = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    
    if(chainId == "137"){  
        if(tokenAddress!=undefined){
            getData(provider, signer, PriceAddresses[chainId][tokenAddress])
        }
        
    }
    if(chainId=="250"){

    }
    if(chainId=="43114"){
        //getData(provider, signer, "0x65285E9dfab318f57051ab2b139ccCf232945451")
    }

    if(chainId=="1"){
        //getData(provider, signer, "0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d")
    }
    
  }, [arOfPrice, chainId, setArOfPrice, tokenAddress])


  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>

  return (
    <></>
  );
};

export default TotalUSD;
