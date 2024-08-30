import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/app/lib/firebase';
import TicketDetail from '@/app/components/TicketDetail';

export default function EditTicket() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      <TicketDetail />
    </div>
  );
}