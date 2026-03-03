import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginForm, loginSchema } from '@/schema/auth-schema.ts';
import { authService } from '@/service/auth.ts';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = authService.useLogin();

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: (res) => {
        reset();

        navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/home');
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border bg-white p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Masuk ke Akun</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Selamat datang kembali! Silakan masukkan detail Anda.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="john@rhcp.com"
                  {...register('email')}
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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
                  placeholder="••••••••"
                  {...register('password')}
                  className="h-11 w-full border-gray-300 py-2 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Forgot Password & Remember */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-gray-500"
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-gray-600 dark:text-gray-400"
                >
                  Ingat saya
                </Label>
              </div>
              <a
                href="#"
                className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Lupa kata sandi?
              </a>
            </div>

            {/* Login Button */}
            <Button type="submit" disabled={isPending} className="h-11 w-full rounded-lg">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Masuk'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Atau
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Lanjutkan dengan Google
          </Button>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Belum punya akun?{' '}
            <a
              href="#"
              className="font-medium text-gray-900 hover:underline dark:text-gray-200"
              onClick={(e) => e.preventDefault()}
            >
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
