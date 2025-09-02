import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import logo from "../../assets/images/Enviar ricardo.png";
import * as S from "./style.ProRata";
import { formatarDecimal } from "../../utils/formataDecimal";
import { calculoProRataUtil } from "../../utils/calculoValorProRata";
import { diferencaDatas } from "../../utils/diferencaDatas";
import { useState } from "react";

export const ProRata = () => {
  
  let dias = 0;
  const[resultadoProRata, setResultadoProRata] = useState<number | undefined>(undefined);
  const[resultData, setResultData] = useState({
    diaInicial:0,
    mesInicial:0,
    anoInicial:0,
    diaFinal:0,
    mesFinal:0,
    anoFinal:0,      
  });
  const[inputValor, setInputValor] = useState("")
  
  let inputRad = document.getElementsByName(
    "cobranca"
  ) as NodeListOf<HTMLInputElement>;

  const [inpDatI, setInpDatI] = useState("");
  const [inpDatF, setInpDataF] = useState("");
  const [resultDias, setResultDias] = useState(0);
  const [showResultado, setShowResultado] = useState(false);
  const [showResulPreco, setShowResultPreco] = useState(false);
const [showCopiar, setShowCopiar] = useState(false);
const [btnText, setBtnText] = useState("➩ Calcular");

  function mudarValorInputCobranca() {
    if (inputRad[1].checked) {
      inputRad[1].checked = false;
      inputRad[0].checked = true;
    }
  }

  function buscarCamposDate() {
    if (!inpDatI || !inpDatF) {
      throw new Error("Os campos de data não foram encontrados.");
    }  
 
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
    const resultRad = document.getElementsByName("cobranca");
   
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

    buscarCamposDate();

    // Calcula a diferença em milissegundos
    const diferenca = diferencaDatas({ dataFinal, dataInicial });

    // Converte a diferença para dias
    dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    // Corrige o erro de tipo: HTMLElement não tem 'checked', mas HTMLInputElement tem.
    const radio0 = resultRad[0] as HTMLInputElement;
    const radio1 = resultRad[1] as HTMLInputElement;

    if (radio0.checked) {
      dias += 1;
    }
    if (radio1.checked) {
      dias = dias === 0 ? 1 : dias;
    }

    calculoProRata();
    setResultDias(dias);
  }

  
  function calculoProRata() {
    const resultPrecoElem = document.getElementById("resultPreco");
    const btnCalcular = document.getElementById("calculo");
    const btnCopiar = document.querySelector(
      ".btnCopiar"
    ) as HTMLButtonElement | null;
    const spanHelp = document.querySelector(".help") as HTMLElement | null;
    const divResultado = document.querySelector(
      ".divResultado"
    ) as HTMLDivElement | null;    
    
    // const valorTotal = parseFloat(inputValor.valueOf.replace(",", "."));
    const valorTotal = inputValor

    //CONDIÇÃO SE O VALOR FOR NAN(NÃO FOR NÚMERO)
    if ((Number(inputValor) === 0) || (inputValor === "")) {
      if (resultPrecoElem) {
        resultPrecoElem.style.display = "none";
      }
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }
      if (btnCopiar) {
        btnCopiar.style.display = "none";
      }
      if (spanHelp) {
        spanHelp.style.display = "none";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
      return;
    }

    // resultado = valorTotal * dias / 30;
    // if (valorTotal === undefined) {
    //   alert("Erro calculoProRata. Input valor errado");
    //   return;
    // }
    
    const resultadoProRata = calculoProRataUtil({ valorTotal: Number(valorTotal), dias }) ;
    setResultadoProRata(resultadoProRata)

    // CONDIÇÃO IGUAL A ZERO
    if (resultadoProRata === 0) {
      if (resultPrecoElem) {
        resultPrecoElem.style.display = "none";
      }
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }
      if (btnCopiar) {
        btnCopiar.style.display = "none";
      }
      if (spanHelp) {
        spanHelp.style.display = "none";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
      return;
    }

    // CONDIÇÃO MAIOR QUE ZERO
    if (resultPrecoElem) {
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }

      resultPrecoElem.style.display = "block";
      if (resultadoProRata) {       
        resultPrecoElem.innerHTML = `R$ ${resultadoProRata
          .toFixed(2)
          .replace(".", ",")}`
      }
      
      if (btnCopiar) {
        btnCopiar.style.display = "block";
      }
      if (spanHelp) {
        spanHelp.style.display = "block";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
    }
    setShowResultado(true);
    setShowResultPreco(true)
  }

  function escolhaTipoProRata() {
    const resultDiv = document.getElementById("cobrado"); //pega a informação de block ou none

    const radioElem = document.querySelector(
      'input[name="tipoPR"]:checked'
    ) as HTMLInputElement | null;

    const radio = radioElem ? radioElem.value : null;

    if (!resultDiv) {
      console.error("Erro função escolhaTipoProRata. Input NULL");
      return;
    }

    resultDiv.style.display = radio === "aditivo" ? "none" : "block";
    // Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.
    mudarValorInputCobranca();
  }



  function limparTela() {
    setInpDatI("");
    setInpDataF("");
    setInputValor("");    
    setBtnText("➩ Calcular");
    setShowCopiar(false);
    setShowResultado(false);  
    mudarValorInputCobranca();
  }

  //Tem a função de mostrar o tooltip (help) ao clicar no ponto de interrogação
  function toggleTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.display =
        tooltip.style.display === "block" ? "none" : "block";
    }
  }

  // Tem a função de esconder o tooltip (help) ao clicar fora do ponto de interrogação
  document.addEventListener("click", function (e) {
    const target = e.target as HTMLElement | null;
    if (!target?.classList.contains("help")) {
      const tooltip = document.getElementById("tooltip");
      if (tooltip) {
        tooltip.style.display = "none";
      }
    }
  });

  function copiarResultado() {
    const botaoCopiar = document.querySelector(
      ".btnCopiar"
    ) as HTMLButtonElement | null;

    if (resultadoProRata) {
      const textoCompleto = `Valor proporcional correspondente a ${dias} dias de locação de "X" equipamentos de radiocomunicação, de ${resultData.diaInicial}/${resultData.mesInicial}/${resultData.anoInicial} a ${resultData.diaFinal}/${resultData.mesFinal}/${resultData.anoFinal} - Valor: R$ ${resultadoProRata
        .toFixed(2)
        .replace(".", ",")}`;

      // copia para área de transferência
      navigator.clipboard
        .writeText(textoCompleto)
        .then(() => {
          if (botaoCopiar) {
            botaoCopiar.innerHTML = "✔️ Copiado!";
          }
          setTimeout(() => {
            if (botaoCopiar) {
              botaoCopiar.innerHTML = "📋 Copiar";
            }
          }, 2000);
        })
        .catch((err) => {
          console.error("Erro ao copiar: ", err);
          setTimeout(() => {
            if (botaoCopiar) {
              botaoCopiar.innerHTML = "📋 Copiar";
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
                    onClick={escolhaTipoProRata}
                    defaultChecked
                  />
                  <span>Aditivo</span>
                </label>
                <label className="labelImput">
                  <input
                    type="radio"
                    name="tipoPR"
                    value="devolucao"
                    onClick={escolhaTipoProRata}
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
              onBlur={formatarDecimal}
              placeholder="0,00"
              value={inputValor}
              onChange={(e)=>setInputValor(e.target.value)}
            />
          </S.divValor>

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
                      defaultChecked
                    />
                    <span>Sim</span>
                  </label>

                  <label htmlFor="radioNao">
                    <input
                      type="radio"
                      name="cobranca"
                      value="nao"
                      id="radioNao"
                    />
                    <span>Não</span>
                  </label>
                </div>
              </S.fieldset>
            </S.fieldsetContainer>
          </S.divRadio>

          <S.divButton className="divButton">
            <S.myButon
              id="calculo"
              className="myButton"
              onClick={calcularDiferenca}
            >
              {btnText}
            </S.myButon>
          </S.divButton>

          <S.divClean className="divLimpar" onClick={limparTela}>
            <S.buttonClean id="buttonClean">Limpar ✗</S.buttonClean>
          </S.divClean>
          {showResultado && (
            <S.divResultado className="divResultado">
           {showResulPreco &&(
             <S.resultPreco id="resultPreco"></S.resultPreco>
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
          resultPreco

          <S.divCopiar className="divCopiar">
            {showCopiar && (
              <S.buttonCopiar
              className="btnCopiar"
              title="Copiar resultado."
              onClick={copiarResultado}
            >              
              📋 Copiar
            </S.buttonCopiar>
            )}
            
            {showResultado && (
               <S.spanHelp
               className="help"
               onClick={toggleTooltip}
               title="Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente."
             >
               {" "}
               ❔{" "}
             </S.spanHelp>
            )}
           

            <S.tooltip id="tooltip">
              Este botão copia automaticamente os dados de período e valor, que
              serão incluídos na fatura do cliente.
            </S.tooltip>
          </S.divCopiar>
        </main>
      </S.Wrapper>
    </S.CenteredContainer>
  );
};
