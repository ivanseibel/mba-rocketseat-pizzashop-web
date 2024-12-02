import { getRestaurant } from "@/api/get-restaurant";
import { updateProfile } from "@/api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
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
    staleTime: Infinity,
  });

  const form = useForm<StoreProfileFormValues>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  async function handleSubmit(values: StoreProfileFormValues) {
    try {
      await updateProfileFn({
        name: values.name,
        description: values.description,
      });
      toast.success("Store profile updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update store profile. Please try again.");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Manage your store profile information visible to your customers.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          <DialogClose asChild>
            <Button variant={"ghost"} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"default"}
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
