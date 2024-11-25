import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const portfolioCompanies = [
  {
    name: '테크스타트업 A',
    industry: '핀테크',
    stage: 'Series A',
    lastUpdated: new Date(),
    documentStatus: {
      financial: 'pending',
      legal: 'complete',
      operational: 'missing',
    },
  },
  {
    name: '바이오스타트업 B',
    industry: '헬스케어',
    stage: 'Series B',
    lastUpdated: new Date(),
    documentStatus: {
      financial: 'complete',
      legal: 'complete',
      operational: 'complete',
    },
  },
  {
    name: '이커머스 C',
    industry: '커머스',
    stage: 'Pre-Series A',
    lastUpdated: new Date(),
    documentStatus: {
      financial: 'missing',
      legal: 'pending',
      operational: 'pending',
    },
  },
];

async function seedDatabase() {
  try {
    for (const company of portfolioCompanies) {
      await addDoc(collection(db, 'portfolios'), company);
    }
    console.log('데이터베이스 시딩 완료!');
  } catch (error) {
    console.error('시딩 중 에러 발생:', error);
  }
}

seedDatabase();
