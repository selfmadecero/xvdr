import PerformanceDetail from '@/components/PerformanceDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <PerformanceDetail id={params.id} />;
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
