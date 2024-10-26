import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="bg-background h-screen w-screen flex items-center justify-center z-50">
      <Icons.circle strokeWidth={1} className="size-24 text-primary animate-spin"/>
    </div>
  );
}
