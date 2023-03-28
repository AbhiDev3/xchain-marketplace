import { Signer, providers } from 'ethers';

import { HypERC721Collateral__factory, HypERC721__factory } from '@hyperlane-xyz/hyperlane-token';


export function getHypErc721CollateralContract(
  contractAddress: Address,
  signerOrProvider: Signer | providers.Provider,
) {
  return HypERC721Collateral__factory.connect(contractAddress, signerOrProvider);
}

export function getHypErc721Contract(
  contractAddress: Address,
  signerOrProvider: Signer | providers.Provider,
) {
  return HypERC721__factory.connect(contractAddress, signerOrProvider);
}
