import { format, utcToZonedTime } from 'date-fns-tz';

export function formatDateISO(date: Date | string, timeZone = 'UTC') {
  const zoned = utcToZonedTime(new Date(date), timeZone);
  return format(zoned, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
}
