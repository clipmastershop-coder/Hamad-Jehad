export default function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-ink/20 bg-navy-50 text-center text-sm font-semibold text-ink/40 ${className}`}
    >
      {label}
    </div>
  );
}
