 
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Layout from '@/app/components/Layout';
import { auth } from '@/app/lib/firebase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.displayName || user.email}!</p>
      {/* Add dashboard content here */}
    </Layout>
  );
}