
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold mb-6 text-indigo-400">Obelisk</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        A digital progress recorder like none other. Obelisk keeps track of your journey, 
        updates your blueprint in real-time, and lets you jump back to any point instantly.
      </p>
      <a
        href="#"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg"
      >
        Join the Waitlist
      </a>
    </main>
  );
}
