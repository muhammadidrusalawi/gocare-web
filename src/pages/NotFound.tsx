import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <h1 className="text-[12rem] leading-none font-black text-slate-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Ghost size={80} className="animate-bounce text-blue-600" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
          Oops! Halaman Tidak Ditemukan
        </h2>
        <p className="mx-auto mb-10 max-w-md text-lg text-slate-600">
          Sepertinya halaman yang Anda cari telah dipindahkan, dihapus, atau mungkin tidak pernah
          ada.
        </p>
      </div>
    </div>
  );
}
