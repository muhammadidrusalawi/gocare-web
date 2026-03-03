import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LogOut, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth.ts';
import { authService } from '@/service/auth.ts';

function getInitialName(name?: string) {
  if (!name) return '—';

  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Userprofile() {
  const { user } = useAuth();
  const logoutMutation = authService.useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-9 rounded-full">
          {getInitialName(user?.name)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="flex items-center gap-4">
          <div className="flex size-9 items-center justify-center rounded-md border bg-gray-50 text-center">
            <span>{getInitialName(user?.name)}</span>
          </div>
          <div>
            <p className="text-[13px] font-medium">{user?.name}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-4">
          <UserCircle />
          <span>Akun</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-4">
          <Settings />
          <span>Pengaturan</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          variant="destructive"
          className="flex items-center gap-4"
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
