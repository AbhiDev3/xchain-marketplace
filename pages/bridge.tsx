import type { NextPage } from 'next';
import Container from '../components/Container/Container';
import { TipCard } from '../components/tip/TipCard';
import { TransferTokenCard } from '../components/features/transfer/TransferTokenCard';
import { AppLayout } from '../components/layout/AppLayout';

const Bridge: NextPage = () => {
  return (
    <Container maxWidth='lg'>
      <AppLayout>
        <div className="space-y-3">
          <TipCard />
          <TransferTokenCard />
        </div>
      </AppLayout>
    </Container>
  );
};

export default Bridge;