// src/utils/time.ts
export function timeAgo(timestampMs: number): string {
  if (!timestampMs) return "";

  const now = Date.now();
  const diff = Math.max(0, now - timestampMs); // ms
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return ` ${sec} ${sec === 1 ? 'second' : 'seconds'} ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return ` ${min} ${min === 1 ? 'minute' : 'minutes'} ago`;

  const hrs = Math.floor(min / 60);
  if (hrs < 24) return ` ${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;

  const days = Math.floor(hrs / 24);
  if (days < 30) return ` ${days} ${days === 1 ? 'day' : 'days'} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return ` ${months} ${months === 1 ? 'month' : 'months'} ago`;

  const years = Math.floor(months / 12);
  return ` ${years} ${years === 1 ? 'year' : 'years'} ago`;
}
