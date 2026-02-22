interface Props {
  title: string;
}

export default function EventHeader({ title }: Props) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-rose-600">
        Confirmar Presença
      </h1>
      <p className="text-lg mt-2 text-gray-700">{title}</p>
    </div>
  );
}