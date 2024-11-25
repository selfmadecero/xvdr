import PerformanceGoalDetail from '@/components/PerformanceGoalDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <PerformanceGoalDetail id={params.id} />;
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
