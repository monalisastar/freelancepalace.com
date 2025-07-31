'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔒 Auto logout after 15 mins (900000 ms)
  useEffect(() => {
    if (!session) return;

    const timer = setTimeout(() => {
      toast('Session expired. Logging out...');
      signOut();
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearTimeout(timer);
  }, [session]);

  // 🧭 Redirect if already logged in
  useEffect(() => {
    if (session?.user?.role === 'client') router.push('/dashboard/client');
    else if (session?.user?.role === 'freelancer') router.push('/dashboard/freelancer');
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error('Invalid email or password');
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    toast.success('Login successful! Redirecting...');
    setTimeout(async () => {
      const session = await getSession();
      const role = session?.user?.role;

      if (role === 'client') router.push('/dashboard/client');
      else if (role === 'freelancer') router.push('/dashboard/freelancer');
      else router.push('/');
    }, 500);
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleDiscordLogin = () => {
    signIn('discord', { callbackUrl: '/' });
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Toaster position="top-center" />

      {/* Left Visual */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/login-visual.jpg)' }}
      >
        <div className="text-center px-10">
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Welcome Back</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Access your dashboard and manage your Web3, AI, and Climate workspaces.
          </p>
        </div>
      </div>

      {/* Right Glass Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg space-y-6"
        >
          <div>
            <h2 className="text-3xl font-semibold text-white">Login</h2>
            <p className="text-sm text-gray-400">Enter your email and password to continue.</p>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-100/10 border border-red-400/30 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-blue-400 hover:text-blue-500 hover:underline transition"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative text-center text-sm text-gray-400">or</div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
          >
            Login with Google
          </button>

          <button
            type="button"
            onClick={handleDiscordLogin}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Login with Discord
          </button>
        </form>
      </div>
    </main>
  );
}
