type Props = {
  valorTotal: number;
  dias: number;
};

export const calculoProRataUtil = ({ valorTotal, dias }: Props) => {
  return (valorTotal * dias) / 30;
};
