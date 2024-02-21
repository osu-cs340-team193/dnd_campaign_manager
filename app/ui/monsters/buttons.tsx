"use client";

import { deleteMonster } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import Button from "@/app/ui/extensions/button";
import Form from "@/app/ui/extensions/form";
import Paragraph from "@/app/ui/extensions/p";

export function DeleteMonster({ id }: { id: number })
{
  const deleteMonsterWithId = deleteMonster.bind(null, id);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(deleteMonsterWithId);

  return (
    <Form action={dispatch}>
      <Button
        className='flex align-middle font-bold bg-blue-400'
      >
        <Paragraph>Delete</Paragraph>
      </Button>
    </Form>
  );
}