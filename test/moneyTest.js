import { formatCurrency } from "../scripts/utils/money.js";

console.log('Test Suite: formatCurrency')
console.log('tests for cents into dollars')
if(formatCurrency(1000) === '10.00'){
  console.log('passed')
} else{
  console.log('failed')
}; 

console.log('test works with zero')
if(formatCurrency(0) === '0.00'){
  console.log('passed')
} else{
  console.log('failed')
};

console.log('test rounds up to nearrest cents')
if(formatCurrency(2000.5) === '20.01'){
  console.log('passed')

} else{
  console.log('failed')
}
console.log('rounds down')
if(formatCurrency(2000.4) === '20.00'){
  console.log('passed')

} else{
  console.log('failed')
}