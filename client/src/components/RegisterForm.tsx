import RegisterImage from '../assets/200630_fciccolella_money_final.webp';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '../types/jwt';

interface RegisterProps {
  onRegister: (user: JwtPayload) => void;
}

export const RegisterForm: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  // Validation
  function validate() {
    if (!/^[a-zA-Z0-9]{3,12}$/.test(username)) {
      return "Username must be 3-12 letters or digits";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return "Password must include upper, lower, digit and symbol";
    }
    if (password !== confirm) {
      return "Passwords do not match";
    }
    return "";
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName: username}),
      });
      const data = await res.json();
      console.log('DEBUG', res.status, data);
      if (!res.ok) {
        // Check if email address registered already
        if (data && data.error && /email/i.test(data.error)) {
          setError('Email already registered');
        } else {
          setError('Registration failed');
        }
        return;
      }
      const token = data.token as string;
      localStorage.setItem('token', token);
      console.log(token);
    
      const decoded = jwtDecode<JwtPayload>(token);
      console.log(decoded);
      onRegister(decoded);
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-indigo-50 dark:bg-gray-900">
      <div className="w-full max-w-5xl flex rounded-xl overflow-hidden shadow-none bg-transparent">
        {/* Image */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/3 relative">
          <img
            src={RegisterImage}
            alt="Register Illustration"
            className="object-cover w-full h-full"
            style={{ maxHeight: 520, objectPosition: '80% center' }} 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-800/40">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow">Join Us!</h2>
            <p className="text-white text-lg opacity-80">Create your account and start networking.</p>
          </div>
        </div>
        {/* Form ... */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center p-12 bg-white/95 dark:bg-gray-800/95">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Sign Up
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Username
              </label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                placeholder="Your Name"
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                placeholder="••••••••"
                required
              />
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
              Sign Up
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
          <div className="mt-8 text-center text-base text-gray-600 dark:text-gray-300">
            Already have an account?
            <a
              href="/login"
              className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
