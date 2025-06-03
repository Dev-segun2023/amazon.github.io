import { renderOrdersummary } from "./scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "./scripts/checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "./data/cart.js";
// import './data/backend-practice.js';
// import './data/products.js';



const loader = document.querySelector('.loader-wrapper');
const amazon = document.querySelector('.amazon');
setTimeout(() => {
// Show loader initially
loader.style.display = 'block';
amazon.style.display = 'none';

// Start fetching
loadPage()

  // After products are rendered, hide loader and show main content
  loader.style.display = 'none';
  amazon.style.display = 'block';


  
},10000)

async function loadPage(){
  try {
    await loadProductsFetch();

 await new Promise((resolve)=>{
  loadCart(()=>{
    resolve();
  });
})
  } catch (error) {
    console.error("Error loading page:", error);
  }


renderOrdersummary();
renderPaymentSummary();

}
// loadPage()


/*
Promise.all([
loadProductsFetch(),
 new Promise((resolve)=>{
     loadCart(()=>{
       resolve();
     })
   })
]).then((values)=>{
  console.log(values)
 renderOrdersummary();
  renderPaymentSummary();

})
*/


/*
new Promise((resolve)=>{
 loadProducts(()=>{
    resolve('value');
  })
}).then((value)=>{
  console.log(value)
   return new Promise((resolve)=>{
     loadCart(()=>{
       resolve();
     })
   })
}).then(()=>{
  renderOrdersummary();
  renderPaymentSummary();
})
*/

// loadProducts(() => {
//   loadCart(()=>{
//     renderOrdersummary();
//     renderPaymentSummary();
//   })
  
// })
