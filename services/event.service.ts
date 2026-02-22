export async function getEvents() {
  const res = await fetch("/api/events");
  return res.json();
}