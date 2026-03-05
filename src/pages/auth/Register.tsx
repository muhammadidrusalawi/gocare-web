import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Akun Baru</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Daftar untuk memulai petualangan Anda.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nama Lengkap
              </Label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Konfirmasi Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Register Button */}
            <Button type="submit" className="h-11 w-full rounded-lg">
              Daftar
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Sudah punya akun?{' '}
            <Link
              to="/auth/sign-in"
              className="font-medium text-gray-900 hover:underline dark:text-gray-200"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
