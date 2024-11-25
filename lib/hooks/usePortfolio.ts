import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Portfolio {
  id: string;
  name: string;
  industry: string;
  stage: string;
  lastUpdated: Date;
  documentStatus: {
    financial: 'complete' | 'pending' | 'missing';
    legal: 'complete' | 'pending' | 'missing';
    operational: 'complete' | 'pending' | 'missing';
  };
}

export function usePortfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'portfolios'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const portfolioData = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Portfolio[];
        setPortfolios(portfolioData);
        setLoading(false);
      },
      (error: Error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { portfolios, loading, error };
}
