const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const ACCENT_BORDER = {
  "text-green-600": "border-l-green-500",
  "text-red-500": "border-l-red-400",
  "text-blue-600": "border-l-blue-500",
  "text-red-600": "border-l-red-500",
};

const ICON_BG = {
  "text-green-600": "bg-green-50 text-green-600",
  "text-red-500": "bg-red-50 text-red-500",
  "text-blue-600": "bg-blue-50 text-blue-600",
  "text-red-600": "bg-red-50 text-red-600",
};

export default function SummaryCard({ label, amount, colorClass, icon }) {
  const accentBorder = ACCENT_BORDER[colorClass] ?? "border-l-gray-300";
  const iconBg = ICON_BG[colorClass] ?? "bg-gray-50 text-gray-500";

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${accentBorder} p-5 flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {label}
        </span>
        <span
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg select-none ${iconBg}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <span className={`text-2xl font-bold leading-none ${colorClass}`}>
        {formatter.format(amount)}
      </span>
    </div>
  );
}
