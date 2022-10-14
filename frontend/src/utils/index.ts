import dayjs from 'dayjs';
import { defaultDateFormat } from '../configs';

export const dateFormat = (date: string) =>
  date ? dayjs(date).format(defaultDateFormat) : '-';

export const numberFormat = (n: number): string =>
  n && !isNaN(n)
    ? (Math.round(n * 100) / 100).toLocaleString('th-TH', {
        minimumFractionDigits: 2,
      })
    : '-';
