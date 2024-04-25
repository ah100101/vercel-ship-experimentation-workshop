import { EyeIcon } from "lucide-react";

export default function WatchingNow() {
  return (
    <div className="flex flex-row items-center py-2 space-x-2 text-blue-800">
      <EyeIcon className="inline-block" size={16} />
      <p className="text-xs font-semibold">
        10 people are looking at this right now
      </p>
    </div>
  );
}
