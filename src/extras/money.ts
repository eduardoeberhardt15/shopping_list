export const onlyNums = value => {
    if (value === undefined) return value;
    return value.replace(/[^\d]/g, "");
  };
  
  export const formatStringToMoney = value => {
    const number = onlyNums(value)
  
    return `R$ ${  (number / 100).toFixed(2).replace('.', ',').split('').reverse().map((v, i) => i > 5 && (i + 6) % 3 === 0 ? `${v}.` : v).reverse().join('')}`
  }
  
  // Formatação de R$ 10,00 para 10.00
  export const formatMoneyToDecimal = value => {
    value = value.replace(".","");
    return value.split("R$ ")[1].replace(",", '.');
  }