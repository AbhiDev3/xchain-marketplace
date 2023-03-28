// @ts-nocheck
import React, { useEffect, useState } from "react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import Head from "next/head";
import { NFT_COLLECTION_ADDRESS } from "../consts/contractAddresses";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {xChainPolygonAbi} from "../hardhat/contracts/polygonAbi";
import { BigNumber } from "ethers";
import { create, SdkBase, SdkConfig } from "@connext/sdk";
import SwapIcon from "../components/Icons/SwapIcon";
import { IconButton } from "../components/buttons/IconButton";

const sdkConfig: SdkConfig = {
  signerAddress: "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb",
  // to do mainnet
  network: "testnet",
  chains: {
    1735353714: { // Goerli domain ID
      providers: ["https://rpc.ankr.com/eth_goerli"],
    },
    1735356532: { // Optimism-Goerli domain ID
      providers: ["https://goerli.optimism.io"],
    },
    9991: {
      providers: ["https://polygon-testnet.public.blastapi.io"]
    }
  },
};


type Props = {
  nft: NFTType;
};

const Bridge721NFT = ({ nft }: Props) => {

  useEffect(() => {
    const run = async () => {
      const { sdkBase } = await create(sdkConfig);
      console.log('sdkBase: ', sdkBase.estimateRelayerFee);
    }
    run();
  })

  const { contract: collectioncontract } = useContract(
    NFT_COLLECTION_ADDRESS
  );
  const [domainID, setDomainID] = useState("9991");
  const [nftContract, setNftContract] = useState("0x60aDe2DBFC12fe45035EA9641e22952a8876410b");
  const assetTokenID = nft?.metadata.id;
  // below one depends on which chain to send
  const [xChainContract, setxChainContract] = useState('');
  const [chainIdMain, setChainIdMain] = useState(80001);
  const [defaultDomain, setDefaultDomain] = useState(true);
  const [showSelectNFT, setShowSelectNFT] = useState(false);
  const [isNFTBriding, setIsNFTBriding] = useState(false);
  const [isNFTBridged, setIsNFTBridged] = useState(false);
  const [relayerFee , setRelayerFee] = useState();
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState();
  const [signer_address, setSigner_address] = useState("0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb");
  


  useEffect(() => {
    // Access the window object here
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    // Get the signer
    const signer = provider.getSigner();
    setSigner(signer);
  }, []);



  
  // async function estimateRelayerFee(sdkBase) {
  //   const relayerFee = (
  //     await sdkBase.estimateRelayerFee({
  //       9991 : Number, 
  //       1735353714 : Number
  //     })
  //   ).toString();

  //   console.log(relayerFee,"re");
  // }
  // estimateRelayerFee(SdkBase);

 

  // xChain address
  const x_chain_polygon_address = "0xF093F0b60AfCFB99283F68611225026470733200";
  const x_chain_op_address = "0xa0C5D2d665869641E86c3d5fE3c9dB4FFF18F67b";
  const x_chain_goerli_address = "0xBba1eA963C05c4b5ea9722EB6bdD223940001A3A";

  // xchain official hashi contracts
  const x_hashi_polygon = "0xd3F1A0782AFD768f8929343Fb44344A2a49fE343";
  const x_hashi_op= "0xb8336251667A3c73faA7e646d3686596069c9D1C";
  const x_hashi_goerli = "0x8F5969b8Fa3727392385C5E74CF1AA91a4aC4b40";


  // cross chain call main function
  const xChain_Contract_Call = (_xChainContract, signer) => {
    if (!_xChainContract) return;
    const x_chain_contract = new ethers.Contract(
      _xChainContract,
      xChainPolygonAbi,
      signer
    );
    console.log(x_chain_contract,"x_chain_contract here");
    return x_chain_contract;
  };


    //cross chain NFT HASHI CALL
    const xchain_NFT = async (
        NFT_COLLECTION_ADDRESS,
        AssetTokenID,
        xChainContract,
        domainID
      ) => {
        try {
          // getting relayer fee
          let relayerMain;
    
          // hashi domainID used for calc relayer fee
          const polyDomain = "9991";
          const opDomain = "1735356532";
          const goerliDomain = "1735353714";


    
          if (domainID == "1735353714") {
            // const relayerFee = (
            //   await sdkBase.estimateRelayerFee({
            //     originDomain: polygonDomain,
            //     destinationDomain: domainID
            //   })
            // )
            // relayerMain = relayerFee;
          }
          else if (domainID == "9991") {
            // const calcrelayerFee = (
            //   await sdkBase.estimateRelayerFee({
            //     originDomain: goerliDomain,
            //     destinationDomain: domainID
            //   })
            // )
            // setRelayerFee(calcrelayerFee);
          }
    
          // approving contract
          let fromChainID = 0;
          let xChainID = 0;
          try {
            
            // approve our xchain contract
            const approveTxn = await collectioncontract.setApprovalForAll(
              xChainContract,
              true
            );
    
            // approve nfthashi polygon contract
            if (domainID == "1735353714") {
              const approveHashiTxn = await collectioncontract.setApprovalForAll(
                x_hashi_polygon,
                true
              );
              fromChainID = 80001;
              xChainID = 5;
              await approveHashiTxn;
            }
            // approve nfthashi goerli contract
            if (domainID == "9991") {
              const approveHashiTxn = await collectioncontract.setApprovalForAll(
                x_hashi_goerli,
                true
              );
              fromChainID = 5;
              xChainID = 80001;
              await approveHashiTxn;
            }
            else if (domainID == "1735356532") {
              const approveHashiTxn = await collectioncontract.setApprovalForAll(
                x_hashi_goerli,
                true
              );
              fromChainID = 5;
              xChainID = 80001;
              await approveHashiTxn;  
            } 
          }
          catch (error) {
            console.log({ approveError: error });
          }
    
 
          // sending xchain call
          try {
            const crossChainPolygon = xChain_Contract_Call(xChainContract, signer);
            
            
            console.log('here',
            domainID,
            32000,
            "5000",
            NFT_COLLECTION_ADDRESS,
            signer_address,
            AssetTokenID,
            "true");

            console.log(crossChainPolygon);

            const sendXChainPolygon = await crossChainPolygon.XChainCall(
              domainID,
              "32000",
              "5000",
              NFT_COLLECTION_ADDRESS,
              signer_address,
              AssetTokenID,
              "true",
              { gasLimit: 1000000 }
            );

            const Txnhash = await sendXChainPolygon.hash;

            console.log(Txnhash);
    
            // console log the txn
          } catch (error) {
            console.log({ XCallError: error });
          }
        } catch (error) {
          console.log({ someCatchError: error });
        }
      };

  const switchPolygonChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      setChainIdMain("80001");
      setShowSelectNFT(true);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "Polygon",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
              },
            ],
          });
          setChainIdMain("80001");
          setShowSelectNFT(true);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const switchGoerliChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      setChainIdMain("5");
      setShowSelectNFT(true);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x5",
                chainName: "Goerli Testnet",
                nativeCurrency: {
                  name: "Goerli Testnet",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://goerli.etherscan.io/"],
                rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
              },
            ],
          });
          setChainIdMain("5");
          setShowSelectNFT(true);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const handleSubmitSelectChain = async (e) => {
    console.log(defaultDomain,chainIdMain,"e")
    // e.preventDefault();
    if (defaultDomain == true && chainIdMain != "80001") {
      switchPolygonChain();
    }
    if (defaultDomain == false && chainIdMain != "5") {
      switchGoerliChain();
    }

    if (defaultDomain == true && chainIdMain == "80001") {
      console.log("set to p");
      setxChainContract(x_chain_polygon_address);
    }
    if (defaultDomain == false && chainIdMain == "5") {
      console.log("set to g");
      setxChainContract(x_chain_goerli_address);
    }
  };


  const handleSubmitBridgeNFT = async (e) => {
    setIsNFTBriding(true);
    if (nftContract != "") {
      try {

        const xChainBridgeTxn = await xchain_NFT(
          nftContract,
          assetTokenID,
          xChainContract,
          domainID
        );

        console.log(xChainBridgeTxn);
        setIsNFTBriding(false);
        setIsNFTBridged(true);
      } catch (error) {
        setIsNFTBriding(false);
        console.log({ someXChainBridgeTxnError: error });
      }
    } else {
      alert("Please try again");
      setIsNFTBriding(false);
    }
  };


  useEffect(() => {
    // setting domain id of xchain destination
    if (chainIdMain == "5") {
      setDomainID("9991");
    }
    else if (chainIdMain == "80001") {
      setDomainID("1735353714");
    }
    else if(chainIdMain == "420"){
      setDomainID("1735356532");
    }
  }, [showSelectNFT, chainIdMain]);

  return (
    <>
      <Head>
        <title>Bridge NFT - using Connext Amarok </title>
        <meta name="description" content="Bridge721 NFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isNFTBridged == false && (
        <>
          {showSelectNFT == false && (
            <form className="relative py-8">
              <div className="container">
                <h1 className="pt-2 text-center font-display text-4xl font-medium text-jacarta-700 ">
                  Bridge Your NFTs
                </h1>
                <p className="mb-16 mt-2 text-center text-sm font-medium text-jacarta-700">
                  Move your NFT X-Chain
                </p>
                <div className="mx-auto max-w-[48.125rem]">
                  {/* select collection  */}
                  <div className="relative">
                    <div>
                      <label className="mb-1 block font-display text-jacarta-700 dark:text-white rounded-lg">
                        Origin Chain
                      </label>
                      <div className="mb-2 flex items-center space-x-2">
                        <p className="text-2xs dark:text-jacarta-300">
                          From
                        </p>
                      </div>
                    </div>
                    {defaultDomain == true ? (
                      <select
                        name="collection"
                        className="dropdown my-1 cursor-pointer w-[100%] bg-amber-200 p-6 text-black border-dashed rounded-lg"
                      >
                        <option>Polygon Mumbai</option>
                      </select>
                    ) : (
                      <select
                        name="collection"
                        className="dropdown my-1 cursor-pointer w-[100%] bg-amber-200 p-6 text-black border-dashed rounded-lg"
                      >
                        <option>Ethereum Goerli </option>
                        <option>Optimism Goerli </option>
                      </select>
                    )}

                    <button
                      onClick={() => {
                        setDefaultDomain(!defaultDomain);
                      }}
                      className="mt-10 mb-10 flex align-middle justify-center"
                      type="button"
                    >
                      Connext     
                      <IconButton
                      imgSrc={SwapIcon}
                      width={22}
                      height={22}
                      title="Swap chains"
                      classes={!disabled ? 'hover:rotate-180' : undefined}
                    />
                    </button>

                    <div>
                      <label className="mb-2 block font-display text-jacarta-700 dark:text-white border-dashed rounded-lg">
                        To Destination Chain
                      </label>
                    </div>

                    {defaultDomain == false ? (
                      <select
                        name="collection"
                        className="dropdown my-1 cursor-pointer w-[100%] bg-green-300 p-6 border-dashed rounded-lg"
                      >
                        <option>Polygon Mumbai</option>
                      </select>
                    ) : (
                      <select
                        name="collection"
                        className="dropdown my-1 cursor-pointer w-[100%] bg-green-300 p-6 border-dashed rounded-lg"
                      >
                        <option>Ethereum Goerli </option>
                        <option>Optimism Goerli </option>
                      </select>
                    )}
                  </div>

                  <button
                    onClick={()=> {
                      handleSubmitSelectChain()}}
                    type="button"
                    className="rounded-full bg-accent mt-8 py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
                  >
                    Continue
                  </button>

                  {console.log(nftContract,
                            assetTokenID,
                            xChainContract,
                            domainID,
                            defaultDomain)}
                </div>
              </div>
            </form>
          )}
          <button onClick={() => {
              handleSubmitBridgeNFT()}} >
              Bridge 
          </button>
        </>
      )}
      {isNFTBridged == true && (
        <div className="flex flex-col justify-center w-full mt-44 mb-44">
          <p className="mb-2 mt-2 text-center text-xl font-medium text-jacarta-700">
            Amazing NFT  bridged successfull 🚀🚀 , see it on the other side
          </p>
        </div>
      )}
    </>
  );
};

export default Bridge721NFT;
