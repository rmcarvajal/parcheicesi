// src/utils/time.ts
export function timeAgo(timestampMs: number): string {
  if (!timestampMs) return "";

  const now = Date.now();
  const diff = Math.max(0, now - timestampMs); // ms
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `Hace ${sec} ${sec === 1 ? 'segundo' : 'segundos'}`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `Hace ${min} ${min === 1 ? 'minuto' : 'minutos'}`;

  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `Hace ${hrs} ${hrs === 1 ? 'hora' : 'horas'}`;

  const days = Math.floor(hrs / 24);
  if (days < 30) return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;

  const years = Math.floor(months / 12);
  return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
}
