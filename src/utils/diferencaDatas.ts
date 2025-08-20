type Props = {
    dataFinal: Date;
    dataInicial: Date;
}

export const diferencaDatas = ({dataFinal,dataInicial}: Props) => {
    return Math.abs(dataFinal.getTime() - dataInicial.getTime())
}