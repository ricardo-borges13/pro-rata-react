export function formatarDecimal() {
    const input = document.getElementById(
      "inputValor"
    ) as HTMLInputElement | null;
    if (input?.value) {
      // Formcata o valor para sempre ter 2 casas decimais    
      input.value = parseFloat(input.value).toFixed(2);
    }   
  }