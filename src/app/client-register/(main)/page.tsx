'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function ClientRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    projectType: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.projectType) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      toast.success('Account created! Redirecting to login...', { duration: 3000 });
      localStorage.setItem('login-email', form.email);

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard/client' });
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Visual Panel */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-cover bg-center backdrop-blur-lg"
        style={{ backgroundImage: 'url(/images/clients-glass-bg.jpg)' }}
      >
        <div className="text-center px-10">
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Start Your Project</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Onboard as a client and access premium freelancers for Web3, AI, Climate, and more.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white">Client Registration</h2>
            <p className="text-sm text-gray-400">Begin your journey with verified talent.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Company Name (optional)</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">What service are you looking for?</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white text-black border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="web3">Web3 / Smart Contracts</option>
                <option value="ai">AI / Data</option>
                <option value="climate">Climate / Carbon</option>
                <option value="design">Design / Creative</option>
                <option value="strategy">Consulting / Strategy</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="mx-3 text-sm text-white/60">or</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 rounded-md bg-white text-black font-semibold border border-white/30 hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}
