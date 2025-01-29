"use client";

interface TodoItemsProps {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
  toggleTodo: (id: string, complete: boolean) => void;
}

export default function TodoItem({
  id,
  title,
  complete,
  createdAt,
  toggleTodo,
}: TodoItemsProps) {
  return (
    <div className="flex justify-between">
      <div>
        <li className="flex gap-1 items-center ">
          <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <label
            htmlFor={id}
            className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
          >
            {title}
          </label>
        </li>
      </div>

      <div>
        {createdAt.toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
