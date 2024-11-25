import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'XVDR - VC를 위한 스마트 문서관리 솔루션',
  description:
    'AI 기반 자동화로 포트폴리오 기업의 문서를 효율적으로 관리하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>{children}</body>
    </html>
  );
}
