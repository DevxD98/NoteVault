export function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[10px] opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}