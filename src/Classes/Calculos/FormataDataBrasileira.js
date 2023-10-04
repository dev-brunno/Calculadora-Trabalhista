import { format } from 'date-fns';

const formatDataBrasileira = (data) => {
  return format(data, 'dd/MM/yyyy');
};

export default formatDataBrasileira;
