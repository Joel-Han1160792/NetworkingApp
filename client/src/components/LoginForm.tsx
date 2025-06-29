import LoginImage from '../assets/200630_fciccolella_money_final.webp';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import type JwtPayload from '../types/jwt';


interface LoginProps {
  onLogin: (user: JwtPayload) => void;
}

export const LoginForm: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      const token = data.token as string;
      localStorage.setItem('token', token);
      // Decode JWT Getting User Info
      const decoded = jwtDecode<JwtPayload>(token);
      onLogin(decoded); // pass to Login
    } catch {
      setError('Login failed');
    }
  };
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-indigo-50 dark:bg-gray-900">
            <div className="w-full max-w-5xl flex rounded-xl overflow-hidden shadow-none bg-transparent">
                {/* Image */}
                <div className="hidden lg:flex flex-col justify-center items-center w-1/3 relative">
                    <img
                        src={LoginImage}
                        alt="Login Illustration"
                        className="object-cover w-full h-full"
                        style={{ maxHeight: 520, objectPosition: '80% center' }} 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-800/40">
                        <h2 className="text-4xl font-bold text-white mb-2 drop-shadow">Welcome Back!</h2>
                        <p className="text-white text-lg opacity-80">NetworkingApp makes your connection easier.</p>
                    </div>
                </div>
                {/* Form */}
                <div className="w-full lg:w-2/3 flex flex-col justify-center p-12 bg-white/95 dark:bg-gray-800/95">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                        Sign In
                    </h2>
                    <form className="space-y-6"
                          onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Email
                            </label>
                            <input
                                
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="
                                w-full 
                                bg-indigo-600 
                                hover:bg-indigo-700 
                                text-white 
                                font-medium 
                                py-2.5 
                                rounded-lg 
                                transition-colors
                                dark:bg-indigo-500 
                                dark:hover:bg-indigo-600
                            "
                        >
                            Sign In
                        </button>
                        {error && <div className="text-red-500">{error}</div>}
                    </form>
                    <div className="mt-8 text-center text-base text-gray-600 dark:text-gray-300">
                        Don't have an account?
                        <a
                            href="#"
                            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
