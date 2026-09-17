export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-accent" />
        <span className="text-[10px] tracking-widest2 uppercase text-foreground/40">Loading</span>
      </div>
    </div>
  );
}
