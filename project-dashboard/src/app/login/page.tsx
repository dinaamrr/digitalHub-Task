'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import {  LogIn, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      if (data.email && data.password && data.firstName && data.lastName) {
        dispatch(
          setUser({
            id: '1',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          })
        );
        router.push('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <LogIn className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome Back
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* First Name Field */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  placeholder="John"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  placeholder="Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" strokeWidth={2} /> */}
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" strokeWidth={2} /> */}
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" strokeWidth={2.5} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Use any email and password (min 6 characters) to login
          </p>
        </div>
      </div>
    </div>
  );
}
