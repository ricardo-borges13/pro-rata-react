export function formatarDecimal(valueInput:string) {      
  const num = Number(valueInput);   
  if (isNaN(num)) return ""; 
  return num.toFixed(2);     
  }
