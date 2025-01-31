"use client";

import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";

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
  const router = useRouter();

  const refereshPage = () => {
    router.refresh();
  };

  return (
    <>
      <TableRow className={complete ? "bg-lime-500" : ""}>
        <TableCell className="font-medium">
          <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={(e) => {
              toggleTodo(id, e.target.checked);
              refereshPage();
            }}
          />
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell className="text-right">
          {createdAt.toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </TableCell>
      </TableRow>
    </>
  );
}
