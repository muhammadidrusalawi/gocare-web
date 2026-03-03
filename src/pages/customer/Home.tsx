import React, { useState, useEffect } from 'react';
import {
  Pill,
  Heart,
  Activity,
  Droplet,
  Thermometer,
  Star,
  Plus,
  Clock,
  Truck,
  Shield,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { HomeLayout } from '@/layouts/HomeLayout.tsx';

// Tipe data
interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold: number;
  isFavorite?: boolean;
  discount?: number;
}

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

// Data dummy
const categories: Category[] = [
  { id: 1, name: 'Obat Bebas', icon: <Pill size={28} />, color: 'bg-blue-100 text-blue-600' },
  {
    id: 2,
    name: 'Vitamin & Suplemen',
    icon: <Heart size={28} />,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    name: 'Peralatan Medis',
    icon: <Activity size={28} />,
    color: 'bg-purple-100 text-purple-600',
  },
  { id: 4, name: 'Produk Bayi', icon: <Droplet size={28} />, color: 'bg-pink-100 text-pink-600' },
  { id: 5, name: 'P3K', icon: <Thermometer size={28} />, color: 'bg-red-100 text-red-600' },
  { id: 6, name: 'Herbal', icon: <Pill size={28} />, color: 'bg-amber-100 text-amber-600' },
  {
    id: 7,
    name: 'Alat Bantu Dengar',
    icon: <Activity size={28} />,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 8,
    name: 'Kebutuhan Harian',
    icon: <Droplet size={28} />,
    color: 'bg-teal-100 text-teal-600',
  },
];

const flashSaleProducts: Product[] = [
  {
    id: 101,
    name: 'Paracetamol 500mg',
    price: 12000,
    originalPrice: 15000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.5,
    sold: 342,
    discount: 20,
  },
  {
    id: 102,
    name: 'Vitamin C 1000mg',
    price: 75000,
    originalPrice: 85000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.8,
    sold: 127,
    discount: 12,
  },
  {
    id: 103,
    name: 'Masker Medis 3ply',
    price: 20000,
    originalPrice: 25000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.7,
    sold: 1500,
    discount: 20,
  },
  {
    id: 104,
    name: 'Termometer Digital',
    price: 100000,
    originalPrice: 120000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.6,
    sold: 89,
    discount: 17,
  },
];

const featuredProducts: Product[] = [
  {
    id: 201,
    name: 'Paracetamol 500mg',
    price: 15000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.5,
    sold: 1200,
  },
  {
    id: 202,
    name: 'Vitamin C 1000mg',
    price: 85000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.8,
    sold: 850,
  },
  {
    id: 203,
    name: 'Masker Medis 3ply',
    price: 25000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.7,
    sold: 3200,
  },
  {
    id: 204,
    name: 'Termometer Digital',
    price: 120000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.6,
    sold: 430,
  },
  {
    id: 205,
    name: 'Obat Batuk OBH',
    price: 20000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.4,
    sold: 670,
  },
  {
    id: 206,
    name: 'Betadine 15ml',
    price: 35000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.9,
    sold: 920,
  },
  {
    id: 207,
    name: 'Hand Sanitizer',
    price: 18000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.5,
    sold: 2100,
  },
  {
    id: 208,
    name: 'Vitamin B12',
    price: 95000,
    image: 'https://ui.shadcn.com/placeholder.svg',
    rating: 4.7,
    sold: 340,
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Siti Aisyah',
    avatar: 'https://i.pravatar.cc/100?img=1',
    comment: 'Pelayanan cepat, obat original. Recomended!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Budi Santoso',
    avatar: 'https://i.pravatar.cc/100?img=2',
    comment: 'Harga bersaing, pengiriman cepat. Terima kasih ApotekSehat.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    avatar: 'https://i.pravatar.cc/100?img=3',
    comment: 'Aplikasi mudah digunakan, banyak pilihan produk.',
    rating: 4,
  },
];

const articles: Article[] = [
  {
    id: 1,
    title: 'Tips Meningkatkan Daya Tahan Tubuh',
    excerpt: 'Panduan lengkap menjaga kesehatan di musim pancaroba...',
    image: 'https://ui.shadcn.com/placeholder.svg',
    date: '12 Mar 2025',
  },
  {
    id: 2,
    title: 'Cara Memilih Vitamin yang Tepat',
    excerpt: 'Jangan sampai salah pilih vitamin, simak tips berikut...',
    image: 'https://ui.shadcn.com/placeholder.svg',
    date: '10 Mar 2025',
  },
  {
    id: 3,
    title: 'Pertolongan Pertama pada Luka',
    excerpt: 'Langkah-langkah sederhana menangani luka di rumah...',
    image: 'https://ui.shadcn.com/placeholder.svg',
    date: '8 Mar 2025',
  },
];

const HomePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 30, seconds: 15 });

  // Simulasi countdown flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <HomeLayout>
      {/* Hero Banner dengan Carousel Sederhana (static untuk demo) */}
      <section className="relative flex h-72 flex-col items-center justify-between rounded-2xl bg-linear-to-r from-blue-500 to-blue-700 p-6 text-white shadow-lg md:flex-row">
        <div>
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Kesehatan Keluarga Prioritas Kami</h2>
          <p className="mb-4 opacity-90">
            Dapatkan diskon hingga 30% untuk pembelian pertama melalui aplikasi.
          </p>
          <button className="rounded-full bg-white px-6 py-2 font-semibold text-blue-600 shadow transition hover:bg-gray-100">
            Belanja Sekarang
          </button>
        </div>
        <div className="absolute right-0 bottom-0 h-full">
          <img src="/hero.png" alt="Promo" className="w-ful h-full" />
        </div>
      </section>

      {/* Layanan Unggulan */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
          <Truck className="text-blue-500" size={32} />
          <div>
            <h4 className="font-semibold">Gratis Ongkir</h4>
            <p className="text-sm text-gray-500">Min. belanja Rp50k</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
          <Shield className="text-blue-500" size={32} />
          <div>
            <h4 className="font-semibold">Produk Original</h4>
            <p className="text-sm text-gray-500">100% terjamin</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
          <Clock className="text-blue-500" size={32} />
          <div>
            <h4 className="font-semibold">24 Jam</h4>
            <p className="text-sm text-gray-500">Layanan konsultasi</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
          <CreditCard className="text-blue-500" size={32} />
          <div>
            <h4 className="font-semibold">Pembayaran Mudah</h4>
            <p className="text-sm text-gray-500">Transfer / e-wallet</p>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Kategori Populer</h3>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-blue-600 hover:underline"
          >
            Lihat Semua <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md"
            >
              <div className={`rounded-full p-3 ${cat.color} mb-2`}>{cat.icon}</div>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-6">
        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
          <div className="flex items-center space-x-2">
            <Clock className="text-red-500" size={28} />
            <h3 className="text-xl font-bold text-gray-800">Flash Sale</h3>
            <div className="rounded-full bg-red-500 px-3 py-1 font-mono text-sm text-white">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
          <a
            href="#"
            className="mt-2 flex items-center text-sm font-medium text-red-600 hover:underline md:mt-0"
          >
            Lihat Semua <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl bg-white p-4 shadow transition hover:shadow-md"
            >
              <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                {product.discount}% OFF
              </div>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-3 h-36 w-full rounded-lg object-cover"
                />
                <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow hover:text-red-500">
                  <Heart size={18} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800">
                {product.name}
              </h4>
              <div className="mb-1 flex items-center">
                <Star size={14} className="fill-current text-yellow-400" />
                <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                <span className="ml-2 text-xs text-gray-400">Terjual {product.sold}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                </div>
                <button className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700">
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produk Unggulan */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Produk Unggulan</h3>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-blue-600 hover:underline"
          >
            Lihat Semua <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-2 h-28 w-full rounded-lg object-cover"
                />
                <button className="absolute top-1 right-1 rounded-full bg-white p-1 shadow">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800">
                {product.name}
              </h4>
              <div className="mb-1 flex items-center">
                <Star size={12} className="fill-current text-yellow-400" />
                <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                <span className="ml-2 text-xs text-gray-400">Terjual {product.sold}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                <button
                  className="rounded-full bg-blue-600 p-1.5 text-white transition hover:bg-blue-700"
                  title="Tambah ke keranjang"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rekomendasi Produk (bisa diisi dengan produk lain) */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Rekomendasi Untukmu</h3>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-blue-600 hover:underline"
          >
            Lihat Semua <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {/* Menggunakan produk featured sebagai contoh, bisa beda nanti */}
          {featuredProducts.slice(0, 6).map((product) => (
            <div
              key={`rec-${product.id}`}
              className="rounded-lg bg-white p-2 text-center shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-2 h-20 w-full rounded object-cover"
              />
              <h5 className="line-clamp-2 text-xs font-medium">{product.name}</h5>
              <span className="text-xs font-bold text-blue-600">{formatPrice(product.price)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-800">Apa Kata Pelanggan?</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testi) => (
            <div key={testi.id} className="rounded-xl border p-4">
              <div className="mb-2 flex items-center space-x-3">
                <img src={testi.avatar} alt={testi.name} className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-semibold">{testi.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testi.rating ? 'fill-current text-yellow-400' : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">"{testi.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artikel Kesehatan */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Artikel & Tips Kesehatan</h3>
          <a
            href="#"
            className="flex items-center text-sm font-medium text-blue-600 hover:underline"
          >
            Lihat Semua <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
            >
              <img src={article.image} alt={article.title} className="h-36 w-full object-cover" />
              <div className="p-4">
                <h4 className="mb-1 line-clamp-2 font-bold text-gray-800">{article.title}</h4>
                <p className="mb-2 line-clamp-2 text-sm text-gray-500">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span className="font-medium text-blue-600">Baca selengkapnya</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex flex-col items-center justify-between rounded-2xl bg-blue-600 p-6 text-white md:flex-row">
        <div>
          <h3 className="mb-2 text-xl font-bold">Dapatkan Info Promo Terbaru</h3>
          <p className="opacity-90">Berlangganan newsletter untuk mendapatkan voucher diskon.</p>
        </div>
        <div className="mt-4 flex w-full md:mt-0 md:w-auto">
          <input
            type="email"
            placeholder="Email Anda"
            className="w-full rounded-l-full px-4 py-2 text-gray-800 focus:outline-none md:w-64"
          />
          <button className="rounded-r-full bg-yellow-400 px-6 py-2 font-semibold text-blue-800 transition hover:bg-yellow-300">
            Subscribe
          </button>
        </div>
      </section>
    </HomeLayout>
    // <div className="min-h-screen bg-gray-50 font-sans">
    //   {/* Header */}
    //   <header className="sticky top-0 z-30 bg-white shadow-md">
    //     <div className="container mx-auto flex items-center justify-between px-4 py-3">
    //       {/* Logo */}
    //       <div className="flex items-center space-x-2">
    //         <Pill className="text-blue-600" size={32} />
    //         <span className="text-xl font-bold text-gray-800">ApotekSehat</span>
    //       </div>
    //
    //       {/* Search Bar Desktop */}
    //       <form
    //         onSubmit={handleSearch}
    //         className="mx-4 hidden max-w-xl flex-1 items-center md:flex"
    //       >
    //         <div className="relative w-full">
    //           <input
    //             type="text"
    //             placeholder="Cari obat, vitamin, atau alat kesehatan..."
    //             className="w-full rounded-l-full border border-gray-300 py-2.5 pr-4 pl-10 focus:border-blue-500 focus:outline-none"
    //             value={searchQuery}
    //             onChange={(e) => setSearchQuery(e.target.value)}
    //           />
    //           <Search className="absolute top-3 left-3 text-gray-400" size={20} />
    //         </div>
    //         <button
    //           type="submit"
    //           className="rounded-r-full bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
    //         >
    //           Cari
    //         </button>
    //       </form>
    //
    //       {/* Icons */}
    //       <div className="flex items-center space-x-4">
    //         <button className="relative p-2 text-gray-600 hover:text-blue-600">
    //           <ShoppingCart size={24} />
    //           {cartCount > 0 && (
    //             <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
    //               {cartCount}
    //             </span>
    //           )}
    //         </button>
    //         <button className="p-2 text-gray-600 hover:text-blue-600">
    //           <User size={24} />
    //         </button>
    //       </div>
    //     </div>
    //
    //     {/* Search Bar Mobile */}
    //     <form onSubmit={handleSearch} className="px-4 pb-3 md:hidden">
    //       <div className="relative">
    //         <input
    //           type="text"
    //           placeholder="Cari produk..."
    //           className="w-full rounded-full border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:outline-none"
    //           value={searchQuery}
    //           onChange={(e) => setSearchQuery(e.target.value)}
    //         />
    //         <Search className="absolute top-2.5 left-3 text-gray-400" size={20} />
    //       </div>
    //     </form>
    //   </header>
    //
    //   {/* Main Content */}
    //   <main className="container mx-auto space-y-8 px-4 py-6">
    //     {/* Hero Banner dengan Carousel Sederhana (static untuk demo) */}
    //     <section className="relative flex h-80 flex-col items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg md:flex-row">
    //       <div>
    //         <h2 className="mb-2 text-2xl font-bold md:text-3xl">
    //           Kesehatan Keluarga Prioritas Kami
    //         </h2>
    //         <p className="mb-4 opacity-90">
    //           Dapatkan diskon hingga 30% untuk pembelian pertama melalui aplikasi.
    //         </p>
    //         <button className="rounded-full bg-white px-6 py-2 font-semibold text-blue-600 shadow transition hover:bg-gray-100">
    //           Belanja Sekarang
    //         </button>
    //       </div>
    //       <div className="absolute right-0 bottom-0 h-full">
    //         <img src="/hero.png" alt="Promo" className="w-ful h-full" />
    //       </div>
    //     </section>
    //
    //     {/* Layanan Unggulan */}
    //     <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
    //       <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
    //         <Truck className="text-blue-500" size={32} />
    //         <div>
    //           <h4 className="font-semibold">Gratis Ongkir</h4>
    //           <p className="text-sm text-gray-500">Min. belanja Rp50k</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
    //         <Shield className="text-blue-500" size={32} />
    //         <div>
    //           <h4 className="font-semibold">Produk Original</h4>
    //           <p className="text-sm text-gray-500">100% terjamin</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
    //         <Clock className="text-blue-500" size={32} />
    //         <div>
    //           <h4 className="font-semibold">24 Jam</h4>
    //           <p className="text-sm text-gray-500">Layanan konsultasi</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center space-x-3 rounded-xl bg-white p-4 shadow-sm">
    //         <CreditCard className="text-blue-500" size={32} />
    //         <div>
    //           <h4 className="font-semibold">Pembayaran Mudah</h4>
    //           <p className="text-sm text-gray-500">Transfer / e-wallet</p>
    //         </div>
    //       </div>
    //     </section>
    //
    //     {/* Kategori */}
    //     <section>
    //       <div className="mb-4 flex items-center justify-between">
    //         <h3 className="text-xl font-bold text-gray-800">Kategori Populer</h3>
    //         <a
    //           href="#"
    //           className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    //         >
    //           Lihat Semua <ChevronRight size={16} />
    //         </a>
    //       </div>
    //       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
    //         {categories.map((cat) => (
    //           <div
    //             key={cat.id}
    //             className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm transition hover:shadow-md"
    //           >
    //             <div className={`rounded-full p-3 ${cat.color} mb-2`}>{cat.icon}</div>
    //             <span className="text-xs font-medium text-gray-700">{cat.name}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Flash Sale */}
    //     <section className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-6">
    //       <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
    //         <div className="flex items-center space-x-2">
    //           <Clock className="text-red-500" size={28} />
    //           <h3 className="text-xl font-bold text-gray-800">Flash Sale</h3>
    //           <div className="rounded-full bg-red-500 px-3 py-1 font-mono text-sm text-white">
    //             {String(timeLeft.hours).padStart(2, '0')}:
    //             {String(timeLeft.minutes).padStart(2, '0')}:
    //             {String(timeLeft.seconds).padStart(2, '0')}
    //           </div>
    //         </div>
    //         <a
    //           href="#"
    //           className="mt-2 flex items-center text-sm font-medium text-red-600 hover:underline md:mt-0"
    //         >
    //           Lihat Semua <ChevronRight size={16} />
    //         </a>
    //       </div>
    //       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //         {flashSaleProducts.map((product) => (
    //           <div
    //             key={product.id}
    //             className="relative rounded-xl bg-white p-4 shadow transition hover:shadow-md"
    //           >
    //             <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
    //               {product.discount}% OFF
    //             </div>
    //             <div className="relative">
    //               <img
    //                 src={product.image}
    //                 alt={product.name}
    //                 className="mb-3 h-36 w-full rounded-lg object-cover"
    //               />
    //               <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow hover:text-red-500">
    //                 <Heart size={18} className="text-gray-400 hover:text-red-500" />
    //               </button>
    //             </div>
    //             <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800">
    //               {product.name}
    //             </h4>
    //             <div className="mb-1 flex items-center">
    //               <Star size={14} className="fill-current text-yellow-400" />
    //               <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
    //               <span className="ml-2 text-xs text-gray-400">Terjual {product.sold}</span>
    //             </div>
    //             <div className="flex items-center justify-between">
    //               <div>
    //                 <span className="text-lg font-bold text-blue-600">
    //                   {formatPrice(product.price)}
    //                 </span>
    //                 <span className="ml-2 text-xs text-gray-400 line-through">
    //                   {formatPrice(product.originalPrice!)}
    //                 </span>
    //               </div>
    //               <button
    //                 onClick={() => addToCart(product.id)}
    //                 className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700"
    //               >
    //                 <Plus size={18} />
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Produk Unggulan */}
    //     <section>
    //       <div className="mb-4 flex items-center justify-between">
    //         <h3 className="text-xl font-bold text-gray-800">Produk Unggulan</h3>
    //         <a
    //           href="#"
    //           className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    //         >
    //           Lihat Semua <ChevronRight size={16} />
    //         </a>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    //         {featuredProducts.map((product) => (
    //           <div
    //             key={product.id}
    //             className="rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md"
    //           >
    //             <div className="relative">
    //               <img
    //                 src={product.image}
    //                 alt={product.name}
    //                 className="mb-2 h-28 w-full rounded-lg object-cover"
    //               />
    //               <button className="absolute top-1 right-1 rounded-full bg-white p-1 shadow">
    //                 <Heart size={16} className="text-gray-400 hover:text-red-500" />
    //               </button>
    //             </div>
    //             <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800">
    //               {product.name}
    //             </h4>
    //             <div className="mb-1 flex items-center">
    //               <Star size={12} className="fill-current text-yellow-400" />
    //               <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
    //               <span className="ml-2 text-xs text-gray-400">Terjual {product.sold}</span>
    //             </div>
    //             <div className="flex items-center justify-between">
    //               <span className="text-base font-bold text-blue-600">
    //                 {formatPrice(product.price)}
    //               </span>
    //               <button
    //                 onClick={() => addToCart(product.id)}
    //                 className="rounded-full bg-blue-600 p-1.5 text-white transition hover:bg-blue-700"
    //                 title="Tambah ke keranjang"
    //               >
    //                 <Plus size={16} />
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Rekomendasi Produk (bisa diisi dengan produk lain) */}
    //     <section>
    //       <div className="mb-4 flex items-center justify-between">
    //         <h3 className="text-xl font-bold text-gray-800">Rekomendasi Untukmu</h3>
    //         <a
    //           href="#"
    //           className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    //         >
    //           Lihat Semua <ChevronRight size={16} />
    //         </a>
    //       </div>
    //       <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
    //         {/* Menggunakan produk featured sebagai contoh, bisa beda nanti */}
    //         {featuredProducts.slice(0, 6).map((product) => (
    //           <div
    //             key={`rec-${product.id}`}
    //             className="rounded-lg bg-white p-2 text-center shadow-sm"
    //           >
    //             <img
    //               src={product.image}
    //               alt={product.name}
    //               className="mb-2 h-20 w-full rounded object-cover"
    //             />
    //             <h5 className="line-clamp-2 text-xs font-medium">{product.name}</h5>
    //             <span className="text-xs font-bold text-blue-600">
    //               {formatPrice(product.price)}
    //             </span>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Testimoni */}
    //     <section className="rounded-2xl bg-white p-6 shadow-sm">
    //       <h3 className="mb-4 text-xl font-bold text-gray-800">Apa Kata Pelanggan?</h3>
    //       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    //         {testimonials.map((testi) => (
    //           <div key={testi.id} className="rounded-xl border p-4">
    //             <div className="mb-2 flex items-center space-x-3">
    //               <img src={testi.avatar} alt={testi.name} className="h-10 w-10 rounded-full" />
    //               <div>
    //                 <p className="font-semibold">{testi.name}</p>
    //                 <div className="flex items-center">
    //                   {[...Array(5)].map((_, i) => (
    //                     <Star
    //                       key={i}
    //                       size={14}
    //                       className={
    //                         i < testi.rating ? 'fill-current text-yellow-400' : 'text-gray-300'
    //                       }
    //                     />
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //             <p className="text-sm text-gray-600">"{testi.comment}"</p>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Artikel Kesehatan */}
    //     <section>
    //       <div className="mb-4 flex items-center justify-between">
    //         <h3 className="text-xl font-bold text-gray-800">Artikel & Tips Kesehatan</h3>
    //         <a
    //           href="#"
    //           className="flex items-center text-sm font-medium text-blue-600 hover:underline"
    //         >
    //           Lihat Semua <ChevronRight size={16} />
    //         </a>
    //       </div>
    //       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    //         {articles.map((article) => (
    //           <div
    //             key={article.id}
    //             className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
    //           >
    //             <img src={article.image} alt={article.title} className="h-36 w-full object-cover" />
    //             <div className="p-4">
    //               <h4 className="mb-1 line-clamp-2 font-bold text-gray-800">{article.title}</h4>
    //               <p className="mb-2 line-clamp-2 text-sm text-gray-500">{article.excerpt}</p>
    //               <div className="flex items-center justify-between text-xs text-gray-400">
    //                 <span>{article.date}</span>
    //                 <span className="font-medium text-blue-600">Baca selengkapnya</span>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //
    //     {/* Newsletter */}
    //     <section className="flex flex-col items-center justify-between rounded-2xl bg-blue-600 p-6 text-white md:flex-row">
    //       <div>
    //         <h3 className="mb-2 text-xl font-bold">Dapatkan Info Promo Terbaru</h3>
    //         <p className="opacity-90">Berlangganan newsletter untuk mendapatkan voucher diskon.</p>
    //       </div>
    //       <div className="mt-4 flex w-full md:mt-0 md:w-auto">
    //         <input
    //           type="email"
    //           placeholder="Email Anda"
    //           className="w-full rounded-l-full px-4 py-2 text-gray-800 focus:outline-none md:w-64"
    //         />
    //         <button className="rounded-r-full bg-yellow-400 px-6 py-2 font-semibold text-blue-800 transition hover:bg-yellow-300">
    //           Subscribe
    //         </button>
    //       </div>
    //     </section>
    //   </main>
    //
    //   {/* Footer */}
    //   <footer className="mt-8 border-t bg-white pt-8 pb-4">
    //     <div className="container mx-auto px-4">
    //       <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    //         <div>
    //           <div className="mb-4 flex items-center space-x-2">
    //             <Pill className="text-blue-600" size={28} />
    //             <span className="text-lg font-bold text-gray-800">ApotekSehat</span>
    //           </div>
    //           <p className="mb-4 text-sm text-gray-500">
    //             Solusi kesehatan keluarga Anda, kapan saja dan di mana saja.
    //           </p>
    //           <div className="flex space-x-3">
    //             <a href="#" className="text-gray-400 hover:text-blue-600">
    //               <Facebook size={20} />
    //             </a>
    //             <a href="#" className="text-gray-400 hover:text-blue-600">
    //               <Instagram size={20} />
    //             </a>
    //             <a href="#" className="text-gray-400 hover:text-blue-600">
    //               <Twitter size={20} />
    //             </a>
    //           </div>
    //         </div>
    //         <div>
    //           <h5 className="mb-4 font-bold text-gray-800">Layanan</h5>
    //           <ul className="space-y-2 text-sm text-gray-500">
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Konsultasi Apoteker
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Resep Online
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Pengiriman
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Cara Pembayaran
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h5 className="mb-4 font-bold text-gray-800">Tentang Kami</h5>
    //           <ul className="space-y-2 text-sm text-gray-500">
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Tentang ApotekSehat
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Karir
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Blog
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" className="hover:text-blue-600">
    //                 Syarat & Ketentuan
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h5 className="mb-4 font-bold text-gray-800">Kontak</h5>
    //           <ul className="space-y-2 text-sm text-gray-500">
    //             <li className="flex items-center space-x-2">
    //               <MessageCircle size={16} /> <span>+62 812 3456 7890</span>
    //             </li>
    //             <li className="flex items-center space-x-2">
    //               <Calendar size={16} /> <span>Senin - Minggu, 24 jam</span>
    //             </li>
    //             <li>cs@apoteksehat.com</li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className="border-t pt-4 text-center text-xs text-gray-400">
    //         &copy; 2025 ApotekSehat. Hak Cipta Dilindungi.
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default HomePage;
// import { HomeLayout } from '@/layouts/HomeLayout.tsx';
//
// export default function HomePage() {
//   return (
//     <HomeLayout>
//       <div className="flex h-screen items-center justify-center">
//         <h1 className="text-3xl font-bold">Home</h1>
//       </div>
//     </HomeLayout>
//   );
// }
