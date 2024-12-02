import { getRestaurant } from "@/api/get-restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileFormValues = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const { data: restaurant } = useQuery({
    queryFn: getRestaurant,
    queryKey: ["restaurant"],
  });

  const form = useForm<StoreProfileFormValues>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Manage your store profile information visible to your customers.
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              className="col-span-3"
              id="name"
              {...form.register("name")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...form.register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant={"ghost"} type="button">
            Cancel
          </Button>
          <Button variant={"default"} type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
