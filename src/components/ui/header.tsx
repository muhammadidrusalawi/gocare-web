import { Button } from '@/components/ui/button.tsx';
import { LogOut, PanelRight, Settings, UserCircle } from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Notifications } from '@/components/ui/notifications.tsx';
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

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const logoutMutation = authService.useLogout();

  return (
    <header className="sticky top-0 right-0 left-0 z-10 flex items-center justify-between px-4 py-2.5">
      <Button variant="ghost" onClick={toggleSidebar}>
        <PanelRight />
      </Button>

      <div className="flex items-center gap-4">
        <Notifications />

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
      </div>
    </header>
  );
}
