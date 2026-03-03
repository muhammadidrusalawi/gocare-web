import { useState, type FormEvent, useMemo } from 'react';
import { icons } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

type IconName = keyof typeof icons;

interface FormState {
  name: string;
  icon: IconName | '';
}

const allIcons = Object.keys(icons) as IconName[];

export default function AdminCreateCategory() {
  const [form, setForm] = useState<FormState>({
    name: '',
    icon: '',
  });

  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    return allIcons.filter((name) => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('SUBMIT:', form);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <Input
          type="text"
          placeholder="Nama Kategori"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />

        <div className="flex flex-col gap-4 rounded-xl border bg-white p-4">
          <Input
            type="text"
            placeholder="Cari ikon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid max-h-72 grid-cols-17 gap-2 overflow-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {filteredIcons.map((name) => {
              const Icon = icons[name];

              return (
                <Button
                  type="button"
                  key={name}
                  variant={form.icon === name ? 'default' : 'outline'}
                  onClick={() => setForm((p) => ({ ...p, icon: name }))}
                  className="flex justify-center rounded p-2"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Submit
        </button>
      </form>
    </AdminLayout>
  );
}

// import { useState, type FormEvent } from 'react';
// import { icons } from 'lucide-react';
// import { AdminLayout } from '@/layouts/AdminLayout';
//
// type IconName = keyof typeof icons;
//
// interface FormState {
//   name: string;
//   icon: IconName | '';
// }
//
// const iconNames = Object.keys(icons) as IconName[];
//
// export default function AdminCreateCategory() {
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     icon: '',
//   });
//
//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     console.log('SUBMIT:', form);
//   };
//
//   const SelectedIcon = form.icon ? icons[form.icon] : null;
//
//   return (
//     <AdminLayout>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Category Name"
//           className="w-full rounded border p-2"
//           value={form.name}
//           onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//         />
//
//         <div className="grid max-h-72 grid-cols-8 gap-2 overflow-auto rounded border p-2">
//           {iconNames.map((name) => {
//             const Icon = icons[name];
//
//             return (
//               <button
//                 type="button"
//                 key={name}
//                 onClick={() => setForm((p) => ({ ...p, icon: name }))}
//                 className={`rounded p-2 ${
//                   form.icon === name ? 'bg-black text-white' : 'hover:bg-gray-100'
//                 }`}
//               >
//                 <Icon size={20} />
//               </button>
//             );
//           })}
//         </div>
//
//         {SelectedIcon && (
//           <div className="flex items-center gap-2">
//             <SelectedIcon size={24} />
//             <span>{form.icon}</span>
//           </div>
//         )}
//
//         <button type="submit" className="rounded bg-black px-4 py-2 text-white">
//           Submit
//         </button>
//       </form>
//     </AdminLayout>
//   );
// }
// import { AdminLayout } from '@/layouts/AdminLayout.tsx';
//
// export default function AdminCreateCategory() {
//   return (
//     <AdminLayout>
//       <div>Create Category</div>
//     </AdminLayout>
//   );
// }
