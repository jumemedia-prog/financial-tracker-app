const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function SummaryCard({ label, amount, colorClass, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
      <span className={`text-2xl font-bold ${colorClass}`}>
        {formatter.format(amount)}
      </span>
    </div>
  );
}
