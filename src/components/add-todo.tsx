import { prisma } from "@/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({
    data: {
      title: title,
      complete: false,
    },
  });
}

export default function AddTodo() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="w-full mx-8">
          <Button variant="outline">Add todo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              Add a todo to your list so you can keep track of your process.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <form
                action={createTodo}
                className="flex items-center space-x-11"
              >
                <Label htmlFor="title" className="text-left">
                  Describe
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  className="col-span-3 w-[200px]"
                />
                <Button type="submit">Add</Button>
              </form>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
