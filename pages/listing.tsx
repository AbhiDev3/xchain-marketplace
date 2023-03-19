import { useContract, useContractRead } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";

export default function Listing() {
    const _startId = 0;
    const _endId = 0;
  const { contract } = useContract("0xB6be599Bc1b29E562F5Fc358a59f6E80313C88b6");
  const { data, isLoading } = useContractRead(contract, "getAllListings", _startId, _endId);
    console.log(data,"data is");
    return (
        <Container maxWidth="lg">
            <h1>Listing</h1>
            <p>Listing NFTs</p>
            <ul>
                {/* {data} */}
            </ul>
        </Container>
    );
}