// Pill-style radio group used by the tools.
export function Choice({ name, value, options, onChange }: { name: string; value: string; options: [string, string][]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, label]) => (
        <label key={v} className={`cursor-pointer rounded-full border px-4 py-2.5 font-medium ${value === v ? "border-jo-navy bg-jo-navy text-white" : "border-[#d9dee6] bg-white text-jo-navy"}`}>
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="sr-only" />
          {label}
        </label>
      ))}
    </div>
  );
}
