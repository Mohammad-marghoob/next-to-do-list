import { prisma } from "@/db";
import TodoItem from "@/components/todoItems";
import AddTodo from "@/components/add-todo";
import LightDarkToggle from "@/components/light-dark-btn";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <AddTodo />
        <LightDarkToggle />
      </header>

      <Table>
        <TableCaption>A list of your recent Todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />;
          })}
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </>
  );
}
