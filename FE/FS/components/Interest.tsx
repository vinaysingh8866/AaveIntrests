import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import ERC20 from '../contracts/ERC20.json'
import io from 'socket.io-client';

type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};
let abi = [{ "inputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "addressesProvider", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ADDRESSES_PROVIDER", "outputs": [{ "internalType": "contract ILendingPoolAddressesProvider", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllATokens", "outputs": [{ "components": [{ "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }], "internalType": "struct AaveProtocolDataProvider.TokenData[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllReservesTokens", "outputs": [{ "components": [{ "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }], "internalType": "struct AaveProtocolDataProvider.TokenData[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getReserveConfigurationData", "outputs": [{ "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "uint256", "name": "ltv", "type": "uint256" }, { "internalType": "uint256", "name": "liquidationThreshold", "type": "uint256" }, { "internalType": "uint256", "name": "liquidationBonus", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactor", "type": "uint256" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }, { "internalType": "bool", "name": "borrowingEnabled", "type": "bool" }, { "internalType": "bool", "name": "stableBorrowRateEnabled", "type": "bool" }, { "internalType": "bool", "name": "isActive", "type": "bool" }, { "internalType": "bool", "name": "isFrozen", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getReserveData", "outputs": [{ "internalType": "uint256", "name": "availableLiquidity", "type": "uint256" }, { "internalType": "uint256", "name": "totalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "totalVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityRate", "type": "uint256" }, { "internalType": "uint256", "name": "variableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "averageStableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityIndex", "type": "uint256" }, { "internalType": "uint256", "name": "variableBorrowIndex", "type": "uint256" }, { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }], "name": "getReserveTokensAddresses", "outputs": [{ "internalType": "address", "name": "aTokenAddress", "type": "address" }, { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" }, { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }], "name": "getUserReserveData", "outputs": [{ "internalType": "uint256", "name": "currentATokenBalance", "type": "uint256" }, { "internalType": "uint256", "name": "currentStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "currentVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "principalStableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "scaledVariableDebt", "type": "uint256" }, { "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityRate", "type": "uint256" }, { "internalType": "uint40", "name": "stableRateLastUpdated", "type": "uint40" }, { "internalType": "bool", "name": "usageAsCollateralEnabled", "type": "bool" }], "stateMutability": "view", "type": "function" }]
const cAdd = "0x7551b5D2763519d4e37e8B81929D336De671d46d";
const Interest = ({ chainId,tokenAddress }) => {
  const [sym, setSym] = useState(null)
  const [intrestBorrow, setIntrestBorrow] = useState(null)
  const [intrestLending, setInterestLending] = useState(null)
  const [userBal, setUserBal] = useState(null) 
  const [socket, setSocket] = useState(null);
  const [socetSet, setSocketSet] = useState(false)
  

  useEffect(() => {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer =  provider.getSigner();
    const contract = new Contract(tokenAddress, ERC20, provider);
    const symbol = contract.symbol()

    async function getData(provider, signer, cAdd){
        const newSocket = io(`http://${window.location.hostname}:8080`);
        let contr = new ethers.Contract(cAdd, abi, provider);
        const bal = await contr.getReserveData(tokenAddress);
        const userBalance = await contr.getUserReserveData(tokenAddress, signer.getAddress());
        setUserBal(userBalance['currentATokenBalance'].toString())
        setInterestLending(Math.round(bal['liquidityRate'].toString() / 1e25))
        setIntrestBorrow(Math.round(bal['variableBorrowRate'].toString() / 1e25))
        newSocket.emit("set-interest",tokenAddress, Math.round(bal['variableBorrowRate'].toString() / 1e25), Math.round(bal['liquidityRate'].toString() / 1e25))
        //console.log("data emmitted")
    }
    const providerPoly = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    
    if(chainId == "137"){    
        getData(provider, signer, cAdd)
    }
    if(chainId=="250"){
        
       // create phantom getData()
    }
    if(chainId=="43114"){
        getData(provider, signer, "0x65285E9dfab318f57051ab2b139ccCf232945451")
    }

    if(chainId=="1"){
        getData(provider, signer, "0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d")
    }
    
    symbol.then((result) => {
        setSym(result.toString())
    }).catch((err) => {
        console.log("error")
    });
  }, [chainId, intrestBorrow, intrestLending, sym, tokenAddress])


  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>

  return (
    <div className="flex flex-nowrap  space-y-5" >
        <div className="w-32 my-5" style={{'marginLeft':'10%'}}>
            {sym}
        </div>
        
        <div className=" w-32 " style={{'marginLeft':'10%'}}>
            {intrestBorrow}%
        </div>
        <div className=" w-32 " style={{'marginLeft':'10%'}}>
            {intrestLending}%
        </div>
        <div className=" w-32 " style={{'marginLeft':'10%'}}>
            {userBal}{sym}
        </div>
    </div>
  );
};

export default Interest;
