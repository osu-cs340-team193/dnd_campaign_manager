"use client";

import { deleteMonster } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export function DeleteMonster({ id }: { id: number })
{
  const deleteMonsterWithId = deleteMonster.bind(null, id);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(deleteMonsterWithId);

  return (
    <form action={dispatch}>
      <button>
        Delete
      </button>
    </form>
  );
}