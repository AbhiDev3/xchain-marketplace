import { useRouter } from 'next/router';
import Container from '../../components/Container/Container';


export default function MyComponent() {

  const router = useRouter();
  const { directListingId } = router.query;
  const id = router.query.id;
  console.log(id,"id");

  const iframeSrc = `https://ipfs.thirdwebcdn.com/ipfs/QmbAgC8YwY36n8H2kuvSWsRisxDZ15QZw3xGZyk9aDvcv7/marketplace-v3.html?contract=0xB6be599Bc1b29E562F5Fc358a59f6E80313C88b6&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%7D&directListingId=${id}&theme=dark`;

  return (
    <Container maxWidth="lg">
        <iframe
        src={iframeSrc}
        width="1000px"
        height="700px"
        style={{ maxWidth: '100%' }}
        ></iframe>
    </Container>
  );
}
