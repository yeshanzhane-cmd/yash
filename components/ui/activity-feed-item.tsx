import { CheckCircle2 } from "lucide-react";

export function ActivityFeedItem({ text, timestamp }: { text: string; timestamp: string }) {
  return (
    <div className="flex items-start gap-2.5 py-2 text-sm first:pt-0 last:pb-0">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-positive" aria-hidden />
      <div className="flex-1">
        <p className="text-white">{text}</p>
        <p className="text-xs text-muted">{timestamp}</p>
      </div>
    </div>
  );
}
