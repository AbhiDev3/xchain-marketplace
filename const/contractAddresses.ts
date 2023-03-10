// deployed them on Mumbai testnet

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;

// 2. The address of the marketplace V3 smart contract.
export const MARKETPLACE_ADDRESS = "0xB6be599Bc1b29E562F5Fc358a59f6E80313C88b6";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS = "0xb9ab49e306b4a5CD610821Beba2f51e8F5a3C30f";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com";
