import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      setMessage('❌ Please enter your email');
      return;
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      // Handle duplicate key
      if (error.code === '23505') {
        setMessage('⚠️ You have already joined the waitlist!');
      } else {
        setMessage('❌ Failed to join the waitlist');
        console.error(error);
      }
      return;
    }

    setMessage('✅ Successfully joined the waitlist!');
    setEmail('');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold mb-6 text-indigo-400">Obelisk</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        A digital progress recorder like none other. Obelisk keeps track of your journey, 
        updates your blueprint in real-time, and lets you jump back to any point instantly.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full max-w-xs rounded mb-4 text-black"
      />

      <button
        onClick={handleJoinWaitlist}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg"
      >
        Join the Waitlist
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </main>
  );
}
