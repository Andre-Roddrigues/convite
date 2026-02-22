interface Props {
  value: "yes" | "no";
  onChange: (value: "yes" | "no") => void;
}

export default function AttendanceSelector({ value, onChange }: Props) {
  return (
    <div className="my-4">
      <label className="block mb-2 font-medium">
        Você irá comparecer?
      </label>

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            value === "yes" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange("yes")}
        >
          Sim, vou comparecer
        </button>

        <button
          className={`px-4 py-2 rounded ${
            value === "no" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange("no")}
        >
          Não poderei comparecer
        </button>
      </div>
    </div>
  );
}