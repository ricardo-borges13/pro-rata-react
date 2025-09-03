import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import logo from "../../assets/images/Logo Datron-BRANCO.png";
import * as S from "./style.ProRata";
import { formatarDecimal } from "../../utils/formataDecimal";
import { calculoProRataUtil } from "../../utils/calculoValorProRata";
import { diferencaDatas } from "../../utils/diferencaDatas";
import { useEffect, useState } from "react";

export const ProRata = () => {
  let dias = 0;
  const [resultadoProRata, setResultadoProRata] = useState<number | undefined>(
    undefined
  );
  const [resultData, setResultData] = useState({
    diaInicial: 0,
    mesInicial: 0,
    anoInicial: 0,
    diaFinal: 0,
    mesFinal: 0,
    anoFinal: 0,
  });
  const [inputValor, setInputValor] = useState("");
  const [cobrancaDia, setCobrancaDia] = useState("sim");
  const [inpDatI, setInpDatI] = useState("");
  const [inpDatF, setInpDataF] = useState("");
  const [resultDias, setResultDias] = useState(0);
  const [showResultado, setShowResultado] = useState(false);
  const [showResultPreco, setShowResultPreco] = useState(false);
  const [showCopiar, setShowCopiar] = useState(false);
  const [tipoProRata, setTipoProRata] = useState("aditivo");
  const [tooltip, setTooltip] = useState(
    " Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente."
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const[textButCopiar, setTextButCopiar] = useState('📋 Copiar')

  function buscarCamposDate() {
    const [anoI, mesI, diaI] = inpDatI.split("-");
    const [anoF, mesF, diaF] = inpDatF.split("-");
    resultData.diaInicial = parseInt(diaI);
    resultData.mesInicial = parseInt(mesI);
    resultData.anoInicial = parseInt(anoI);
    resultData.diaFinal = parseInt(diaF);
    resultData.mesFinal = parseInt(mesF);
    resultData.anoFinal = parseInt(anoF);
  }

  function calcularDiferenca() {
    const dataInicial = new Date(inpDatI);
    const dataFinal = new Date(inpDatF);

    if (isNaN(dataInicial.getTime()) || isNaN(dataFinal.getTime())) {
      alert("Por favor, insira datas válidas.");
      return;
    }

    if (dataFinal < dataInicial) {
      alert("A data final não poder ser anterior a data inicial.");
      return;
    }
    // Calcula a diferença em milissegundos
    const diferenca = diferencaDatas({ dataFinal, dataInicial });

    // Converte a diferença para dias
    dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    if (cobrancaDia === "sim") {
      dias += 1;
    }
    if (cobrancaDia === "nao") {
      dias = dias === 0 ? 1 : dias;
    }
    calculoProRata();
    setResultDias(dias);
  }

  function calculoProRata() {
    const valorTotal = inputValor;

    if (Number(inputValor) === 0 || inputValor === "") {
      setShowResultado(true);
      return;
    }

    const resultadoProRata = calculoProRataUtil({
      valorTotal: Number(valorTotal),
      dias,
    });
    setResultadoProRata(resultadoProRata);

    setShowResultado(true);
    setShowResultPreco(true);
    setShowCopiar(true);
    buscarCamposDate();
  }

  function limparTela() {
    setInpDatI("");
    setInpDataF("");
    setInputValor("");
    setShowCopiar(false);
    setShowResultado(false);
    setShowResultPreco(false);
    setResultadoProRata(undefined);
    setCobrancaDia("sim");
  }

  // Alterna a visibilidade do tooltip ao clicar no ponto de interrogação
  function toggleTooltip(e: React.MouseEvent) {
    e.stopPropagation(); // evita que o clique feche imediatamente
    setShowTooltip(() => !showTooltip);
  }

  // Esconde o tooltip ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".help")) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
 
  function copiarResultado() {
      if (resultadoProRata) {
      const textoCompleto = `Valor proporcional correspondente a ${resultDias} dias de locação de "X" equipamentos de radiocomunicação, de ${
        resultData.diaInicial
      }/${resultData.mesInicial}/${resultData.anoInicial} a ${
        resultData.diaFinal
      }/${resultData.mesFinal}/${
        resultData.anoFinal
      } - Valor: R$ ${resultadoProRata.toFixed(2).replace(".", ",")}`;

      // copia para área de transferência
      navigator.clipboard
        .writeText(textoCompleto)
        .then(() => {
          if (textButCopiar) {           
            setTextButCopiar("✔️ Copiado!");
          }
          setTimeout(() => {
            if (textButCopiar) {              
              setTextButCopiar("📋 Copiar");              
            }
          }, 2000);
        })
        .catch((err) => {
          console.error("Erro ao copiar: ", err);
          setTimeout(() => {
            if (textButCopiar) {
              setTextButCopiar("📋 Copiar");  
            }
          }, 2000);
        });
    }
  }

  return (
    <S.CenteredContainer>
      <S.Wrapper className="wrapper">
        <Header image={logo} title="Cálculo Pro Rata - REACT" />

        <main className="main-container">
          <S.fieldsetContainer className="fieldset-container">
            <S.fieldset className="fieldset">
              <legend>
                <b>Escolha o Tipo de Pro Rata</b>
              </legend>
              <div>
                <label className="labelImput">
                  <input
                    type="radio"
                    name="tipoPR"
                    value="aditivo"
                    checked={tipoProRata === "aditivo"}
                    onChange={(e) => setTipoProRata(e.target.value)}
                  />
                  <span>Aditivo</span>
                </label>
                <label className="labelImput">
                  <input
                    type="radio"
                    name="tipoPR"
                    value="devolucao"
                    checked={tipoProRata === "devolucao"}
                    onChange={(e) => setTipoProRata(e.target.value)}
                  />
                  <span>Devolução</span>
                </label>
              </div>
            </S.fieldset>
          </S.fieldsetContainer>

          <S.divData className="divData">
            <S.divDataIF className="dataI">
              <label htmlFor="DataI">Data Inicial</label>
              <S.inputDate
                type="date"
                id="InpDataI"
                value={inpDatI}
                onChange={(e) => setInpDatI(e.target.value)}
              />
            </S.divDataIF>
            <S.divDataIF className="dataF">
              <label htmlFor="Data">Data Final</label>
              <S.inputDate
                type="date"
                id="InpDataF"
                value={inpDatF}
                onChange={(e) => setInpDataF(e.target.value)}
              />
            </S.divDataIF>
          </S.divData>

          <S.divValor className="divValor">
            <label htmlFor="valor">
              <b>Valor Mensal dos Itens (R$)</b>
            </label>
            <S.inputValor
              type="number"
              name="valor"
              id="inputValor"
              step="0.01"
              onBlur={() => setInputValor(formatarDecimal(inputValor))}
              placeholder="0,00"
              value={inputValor}
              onChange={(e) => setInputValor(e.target.value)}
            />
          </S.divValor>

          {tipoProRata === "devolucao" && (
            <S.divRadio id="cobrado" className="divRadio">
              <S.fieldsetContainer className="fieldsetContainer">
                <S.fieldset className="fieldset">
                  <legend>
                    <b>O dia que foi devolvido será cobrado?</b>
                  </legend>
                  <div className="divInputCobranca">
                    <label htmlFor="radioSim">
                      <input
                        type="radio"
                        name="cobranca"
                        value="sim"
                        id="radioSim"
                        checked={cobrancaDia === "sim"}
                        onChange={(e) => setCobrancaDia(e.target.value)}
                      />
                      <span>Sim</span>
                    </label>

                    <label htmlFor="radioNao">
                      <input
                        type="radio"
                        name="cobranca"
                        value="nao"
                        id="radioNao"
                        checked={cobrancaDia === "nao"}
                        onChange={(e) => setCobrancaDia(e.target.value)}
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </S.fieldset>
              </S.fieldsetContainer>
            </S.divRadio>
          )}

          <S.divButton className="divButton">
            <S.myButon
              id="calculo"
              className="myButton"
              onClick={calcularDiferenca}
            >
              ➩ Calcular
            </S.myButon>
          </S.divButton>

          <S.divClean className="divLimpar" onClick={limparTela}>
            <S.buttonClean id="buttonClean">Limpar ✗</S.buttonClean>
          </S.divClean>
          {showResultado && (
            <S.divResultado className="divResultado">
              {showResultPreco && (
                <S.resultPreco id="resultPreco">
                  R$ {resultadoProRata?.toFixed(2).replace(".", ",")}
                </S.resultPreco>
              )}

              <S.resultDias>
                {resultDias > 0 && (
                  <>
                    Período de Locação:{" "}
                    <span id="spanDias">
                      {resultDias} {resultDias === 1 ? "dia" : "dias"}
                    </span>
                  </>
                )}
              </S.resultDias>
            </S.divResultado>
          )}

          {showCopiar && (
            <S.divCopiar className="divCopiar">
              <S.buttonCopiar
                className="btnCopiar"
                title="Copiar resultado."
                onClick={copiarResultado}
              >
                {textButCopiar}
              </S.buttonCopiar>
              <S.spanHelp
                className="help"
                onClick={toggleTooltip}
                title="Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente."
              >
                {" "}
                ❔{" "}
              </S.spanHelp>

              {showTooltip && (
                <S.tooltip onClick={toggleTooltip} id="tooltip">
                  {tooltip}
                </S.tooltip>
              )}
            </S.divCopiar>
          )}
        </main>
      </S.Wrapper>
    </S.CenteredContainer>
  );
};
