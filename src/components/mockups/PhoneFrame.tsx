export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-xs rounded-[2rem] border border-line bg-surface p-3 shadow-xl shadow-ink/5">
      <div className="rounded-[1.5rem] border border-line bg-paper p-5 min-h-[22rem]">
        {children}
      </div>
    </div>
  );
}
