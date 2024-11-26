import { getProfile } from "@/api/get-profile";
import { getRestaurant } from "@/api/get-restaurant";
import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  });

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
    queryFn: getRestaurant,
    queryKey: ["restaurant"],
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {isLoadingProfile ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            restaurant?.name
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-32" />
            </>
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="font-normal text-muted-foreground text-xs">
                {profile?.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
