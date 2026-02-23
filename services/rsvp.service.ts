// services/rsvp.service.ts
interface ConfirmPresenceData {
  eventId: string;
  fullName: string;
  phone: string;
  attendance: "yes" | "no";
  message: string;
}

export async function confirmPresence(data: ConfirmPresenceData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        attendance: data.attendance === "yes", // Converte "yes"/"no" para boolean
        message: data.message,
        eventId: data.eventId
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao confirmar presença');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no serviço de confirmação:', error);
    throw error;
  }
}