import { AppLayout } from '@/components/app-layout';
import { Recommendations } from '@/components/recommendations';

export default function Home() {
  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <Recommendations />
      </main>
    </AppLayout>
  );
}
