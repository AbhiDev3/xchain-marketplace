import Image from 'next/image';
import Link from 'next/link';

import { WalletControlBar } from '../../components/features/wallet/WalletControlBar';
import Logo from '../images/logos/app-logo.svg';
import Name from '../images/logos/app-name.svg';


export function Header() {
  return (
    <header className="pt-3 pb-2 w-full">
      <div className="flex items-center justify-between">
        <Link href="/bridge" className="flex items-center">
          <Image src={Logo} width={19} alt="" />
          <Image src={Name} width={110} alt="" className="hidden sm:block mt-0.5 ml-2" />
        </Link>
        <WalletControlBar />
      </div>
    </header>
  );
}
