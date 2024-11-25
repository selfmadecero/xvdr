// 서버 컴포넌트
import DocumentDetail from '@/components/DocumentDetail';

export default function Page({ params }: { params: { id: string } }) {
  return <DocumentDetail id={params.id} />;
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
