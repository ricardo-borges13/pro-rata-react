export function formatarDecimal(valueInput:string) {      
  const num = Number(valueInput);   
  if (isNaN(num)) return ""; 
  return num.toFixed(2);     
  }


  // export function formatarDecimal(value:string) {
  //   const input = document.getElementById(
  //     "inputValor"
  //   ) as HTMLInputElement | null;
  //   if (input?.value) {
  //     // Formcata o valor para sempre ter 2 casas decimais    
  //     input.value = parseFloat(input.value).toFixed(2);
  //   }   
  // }