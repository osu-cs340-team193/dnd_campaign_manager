// Application logo component.
// See: https://nextjs.org/learn/dashboard-app/optimizing-fonts-images

import DndIcon from "@/app/ui/dnd-icon";

export default function AppLogo()
{
  return (
    <div className="flex flex-row">
      <div className="pr-1">
        <DndIcon props={{ height: 55 }}/>
      </div>
      <div className="self-center">
        <p className="text-2xl font-bold text-rose-900">
          Campaign Manager
        </p>
      </div>
    </div>
  );
}