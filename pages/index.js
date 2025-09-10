import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      setMessage('❌ Please enter your email.');
      return;
    }

    const { error } = await supabase.from('waitlist').insert([{ email }]);

    if (error) {
      console.error(error);
      setMessage('❌ Failed to join waitlist. Maybe this email already exists.');
    } else {
      setMessage('✅ Successfully joined the waitlist!');
      setEmail('');
    }
  };

  return (
    <main className="...">
      {/* Existing landing page content */}
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleJoinWaitlist}
        className="bg-indigo-500 text-white px-6 py-3 rounded-xl"
      >
        Join the Waitlist
      </button>
      {message && <p>{message}</p>}
    </main>
  );
}

