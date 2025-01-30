import { prisma } from "@/db";
import TodoItem from "@/components/todoItems";
import AddTodo from "@/components/add-todo";
import LightDarkToggle from "@/components/light-dark-btn";

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

      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />;
        })}
      </ul>
    </>
  );
}
