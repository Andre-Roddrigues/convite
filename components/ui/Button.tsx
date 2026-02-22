interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
    >
      {children}
    </button>
  );
}