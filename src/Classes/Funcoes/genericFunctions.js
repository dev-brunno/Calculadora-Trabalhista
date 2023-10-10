import { format } from 'date-fns';

export const FormataDataBrasileira = (data) => {
  return format(data, 'dd/MM/yyyy');
};

export function FormataRealBrasileiro(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function createDateFromYYYYMMDD(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // O mês em JavaScript é baseado em zero (janeiro = 0, fevereiro = 1, ...)
}
