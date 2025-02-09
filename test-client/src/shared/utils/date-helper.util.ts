export const parseDate = (stringDate: string | number | Date): Date =>
  new Date(typeof stringDate === 'string' ? stringDate.replace(/\s/, 'T') : stringDate);

export const timestampToDDMMYY = (timestamp: number | Date | string): string => {
  const date = parseDate(timestamp);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100;

  return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year < 10 ? '0' : ''}${year}`;
};

export const msToTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
