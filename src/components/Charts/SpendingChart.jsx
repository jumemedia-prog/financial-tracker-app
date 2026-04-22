import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-gray-700">{entry.name}</p>
      <p className="text-gray-500">{formatter.format(entry.value)}</p>
    </div>
  );
}

export default function SpendingChart({ expensesByCategory }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Dépenses par catégorie
      </h2>
      {expensesByCategory.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 min-h-[260px] text-gray-400 text-sm gap-2">
          <span className="text-3xl text-gray-200" aria-hidden="true">◔</span>
          Aucune dépense à afficher.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={expensesByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={48}
              paddingAngle={3}
              strokeWidth={0}
            >
              {expensesByCategory.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
