// @ts-nocheck
import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { useState , useEffect } from "react";
import { ethers } from "ethers";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  useEffect(() => {
    async function getNetwork() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      console.log(network.chainId, 'network.chainId');
      if (network.chainId === 534353) {
        // Scroll testnet
        setNftCollectionAddress('0x8d72887163f8bD8A65649Ef4af37dcc21500e5A1');
      } else if (network.chainId === 10200) {
        // chiado testnet
        setNftCollectionAddress('0x5F3eC562AD05A1395b43Fbf0098bB34ada4846c0');
      } else if (network.chainId === 5001) {
        // mantle testnet
        setNftCollectionAddress('0x977bb1ba20d6DF6E8a07178605C6A75618c705eF');
      }

    }
    getNetwork();
  }, []);

  const [nftCollectionAddress, setNftCollectionAddress] = useState('0x60aDe2DBFC12fe45035EA9641e22952a8876410b');
  const { contract } = useContract(nftCollectionAddress);
  console.log(contract);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection yet."
        }
      />
    </Container>
  );
}
