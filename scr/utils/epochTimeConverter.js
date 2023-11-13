module.exports = (epochTime) => {
  //Coleta a data e multiplica por 1000 por ser milisegundos
  const dataConvertida = new Date(epochTime * 1000);

  //É adicionado um 0 a esquerda dos números menores que 10, para ficar formatado corretamente
  //No mês, é adicionado 1 no número, porque Janeiro é considerado como mês 0.
  const textoDataConvertida =
    (dataConvertida.getDate() < 10 ? "0" : "") +
    dataConvertida.getDate() +
    "/" +
    ((dataConvertida.getMonth() < 10 ? "0" : "") +
      (dataConvertida.getMonth() + 1)) +
    "/" +
    dataConvertida.getFullYear() +
    " às " +
    ((dataConvertida.getHours() < 10 ? "0" : "") + dataConvertida.getHours()) +
    ":" +
    ((dataConvertida.getMinutes() < 10 ? "0" : "") +
      dataConvertida.getMinutes());

  return [dataConvertida, textoDataConvertida];
};
