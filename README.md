# X-Chain Gaming NFT Marketplace
Unlock limitless possibilities with our Cross-Chain Gaming NFT Marketplace - Where every NFT is a masterpiece Game Asset waiting to be discovered.

Earn through your in-game assets by listing them on Our X-Chain Marketplace and take your NFT's with you to whichever Chain you wish.

![marketplace](https://user-images.githubusercontent.com/95926324/227322157-928accde-e02c-4369-bfa9-0f15aa2b7258.png)

## Features

Our X-chain marketplaces provides several advantages over traditional Marketplaces :

1> Users can earn through your in-game assets by listing it on the platform . 

Aiming to solve problems reflected by Game7 https://cdn.game7.io/reports/Game-Developer-Report-by-Game7.pdf.

2> Walletless Onboarding for the users via Intmax https://github.com/legendarykamal/xchain-marketplace/pull/2 , this further opens the possibilities of mainstream adoption as users would be able to use the platform with phones and the best UX.

3> Increased liquidity: Our X-chain marketplace allow users to trade assets across multiple blockchains, which can increase liquidity and allow for more trading opportunities.

4> Interoperability: Our X-chain marketplace enable the exchange of assets across different blockchains, creating interoperability between different ecosystems. This allows users to access a wider range of assets and enables them to participate in different blockchain communities.

5> Lower fees: Our X-chain marketplace being on zk-rollup offers lower transaction fees compared to traditional marketplaces, as it is not limited to a single blockchain.

6> Increased security: X-chain marketplaces offers increased security by utilizing different blockchains, which can make it more difficult for hackers to attack the platform. 

Additionally, X-chain marketplace aims to implement Gnosis MultiSign wallet to the platform to enhance security of the platform.

![image](https://user-images.githubusercontent.com/95926324/227724969-0730ad8b-871d-4659-9609-054d2be9831e.png)

# How technogies are utilised to bring the best X-Chain Marketplace ?

* The Marketplace gives the users the Facility to Bridge tokens and NFT's from One chain to Another ( Interoperability ) 🥐 

* Marketplace is built utilising the Connext NftHashi for Bridging the NFT's across Polygon , Goerlli , Optimism.
Zk-Sync will be supported soon 🧋.

## Connext xchain calls for Bridging the NFT's along 3 Multiple chains.

- https://mumbai.polygonscan.com/address/0xf093f0b60afcfb99283f68611225026470733200

xchainGERC721.sol

Gorelli - 0xBba1eA963C05c4b5ea9722EB6bdD223940001A3A

Polygon - https://mumbai.polygonscan.com/address/0xF093F0b60AfCFB99283F68611225026470733200

Optimism - 0xa0C5D2d665869641E86c3d5fE3c9dB4FFF18F67b

* Hyperlane Brings in a lot of interoperability interms of token 🪙 and Nfts across multiple Chains and Bringing in the feature to Bridge to Scroll 💫.

# MultiChain == Increased Liquidity across Multiple Chains

## ERC-721 NFT Collections 

Scroll NFT_CONTRACT = 0x8d72887163f8bD8A65649Ef4af37dcc21500e5A1

Gnosis NFT = 0x5F3eC562AD05A1395b43Fbf0098bB34ada4846c0

https://blockscout.chiadochain.net/tx/0x0b45264c843bf151da9b4c779ef421f038ac026c5ee2dafcaa169b59b33d6c61

Mantle NFT Collection = 0x977bb1ba20d6DF6E8a07178605C6A75618c705eF

# Marketplace Deployment Address

## scroll-alpha-testnet = 0x566795483507380aA2E25F60D8C93940392cc093

Sample Listing Creation - https://blockscout.scroll.io/tx/0x6b26187ee88ab27dbd879cf75d485b738bd0175552fbd2a6c7d4bc0dda6aa1d0

## Mumbai = 0xB6be599Bc1b29E562F5Fc358a59f6E80313C88b6

## Gnosis Chaiado = 0xdf366B8FB6553E6F5826Ee6195cb9330A34442c1

## Mantle = 0x8b24F9805c44B505319F681130E199c97fbD58d4
https://explorer.testnet.mantle.xyz/address/0x8b24F9805c44B505319F681130E199c97fbD58d4

Optimism = 0xF43989FcB43dAdF6A28214D4Ad5D9A7647fe7f62

## Mumbai = 0xC0A1504202d74faa34eDb183BA0ab47C3b2cf36a 


# Hyperlane Scroll Deployment

## Bringing Scroll to Hyperlane

Deployed addresses

MultisigIsm deployed at address 0x0816d0C250EEf4FdF04997F62FaAe97D3E3f2b5d TestRecipient deployed at address 0x5681f7DBA81D068cA804d0b2aC4D3b00370A4dB0

Messages sent https://explorer.hyperlane.xyz/message/5b6efc41945190f2d5e959fd23af25cc4fbf565a8b3c64c9714c990bfc884526

RPC_URL=https://alpha-rpc.scroll.io/l2 

![image](https://user-images.githubusercontent.com/95926324/227232530-8d23e8a6-8c88-44d0-93fb-f41b8b8f40f4.png)

ERC20 Interchain token deployed on Scroll via HYPERLANE = 0xe80E963D66252218C45299e3Cd42A71D3bb40477

ERC721  Interchain token deployed on Scroll via HYPERLANE = 0x8d72887163f8bD8A65649Ef4af37dcc21500e5A1

https://goerli.etherscan.io/tx/0xd1ef2a6b28c414d336867b21edd87673247430bedacfa1dddc9cf250b2469f31
https://goerli.etherscan.io/tx/0x877b5bad5f8e619089c91e9616b69ed927803d630a207905fa3b6bdd41795eed
https://goerli.etherscan.io/tx/0x17d8913dbdbb14d9f0e40cb40879002484a30ceb100bed4b0a74d319373ef232
https://goerli.etherscan.io/tx/0xaadc4f55953943e931da7ab75adaa9c16ca14564fddf3bd3041f8bdc161b16f4

## How to use

- View all NFTs from your collection and their status on the marketplace on the [buy](/pages/buy.tsx) page.

- Select which NFT from your wallet to sell for either a **direct listing** or **english auction** or to **bridge your game asset aka NFT** on the marketplace on the [sell](/pages/sell.tsx) page.

- View all NFTs a user owns from your collection on the [profile](/pages/profile/%5Baddress%5D.tsx) pages.

- Note for the NFT's to be visible on the Sell Page, you must connect your wallet first.

- Buy NFTs directly from the marketplace on the [item](/pages/token/%5BcontractAddress%5D/%5BtokenId%5D.tsx) pages.

- Place bids/offers on NFTs from the marketplace on the [item](/pages/token/%5BcontractAddress%5D/%5BtokenId%5D.tsx) pages.

- Briding NFT's via Connext on the Sell pg under Bridge Tab 

- Bridging interchain Tokens and NFT's via Hyperlane on the [buy](/pages/bridge.tsx) page 
