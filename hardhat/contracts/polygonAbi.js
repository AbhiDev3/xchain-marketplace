export const xChainPolygonAbi =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftHashiBridgeContract",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "destination",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "relayerFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "slippage",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isTokenURIIgnored",
          "type": "bool"
        }
      ],
      "name": "XChainCall",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]