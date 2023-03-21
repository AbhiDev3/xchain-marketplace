import type { NextPage } from 'next';

import { TipCard } from '../components/tip/TipCard';
import { TransferTokenCard } from '../components/features/transfer/TransferTokenCard';

const Bridge: NextPage = () => {
  return (
    <div className="space-y-3">
      <TipCard />
      <TransferTokenCard />
    </div>
  );
};

export default Bridge;