import { formatCurrency } from "../scripts/utils/money.js";
import { orders } from "./order.js";
import { getProduct } from "./products.js";
import { loadProductsFetch } from "./products.js";
import dayjs from 'https:unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

import { cart } from './cart.js';


console.log(orders)

loadProductsFetch().then(()=>{
  renderOrderPage();
  
});

/*
function renderOrderPage() {
let orderHTML = '';

   orders.forEach((order) => {
   const date = new Date(order.orderTime);
   const totalCostCents = formatCurrency(order.totalCostCents);
   const orderId = order.id;

   const orderProducts = order.products;
      
   let product;
   let orderQuantity;
   let deliveryDate;
      orderProducts.forEach((orderProduct) => {
      product = getProduct(orderProduct.productId);
   
     orderQuantity = orderProduct.quantity;
     deliveryDate = new Date(orderProduct.estimateDeliveryTime);




      })

  
  
   const orderhtml = `

           <div class="order-container">

           <div class="order-header">
             <div class="order-header-left-section">
               <div class="order-date">
                 <div class="order-header-label">Order Placed:</div>
                 <div>${date.toLocaleDateString()}</div>
               </div>
               <div class="order-total">
                 <div class="order-header-label">Total:</div>
                 <div>$${totalCostCents}</div>
               </div>
             </div>

             <div class="order-header-right-section">
               <div class="order-header-label">Order ID:</div>
               <div>${orderId}</div>
             </div>
           </div>

           <div class="order-details-grid">
             <div class="product-image-container">
               <img src="${product.image}">
             </div>

             <div class="product-details">
               <div class="product-name">
                 ${product.name}
               </div>
               <div class="product-delivery-date">
                 Arriving on: ${deliveryDate.toLocaleDateString()}
               </div>
               <div class="product-quantity">
                 Quantity: ${orderQuantity}
               </div>
               <button class="buy-again-button button-primary">
                 <img class="buy-again-icon" src="images/icons/buy-again.png">
                 <span class="buy-again-message">Buy it again</span>
               </button>
             </div>

             <div class="product-actions">
               <a href="tracking.html">
                 <button class="track-package-button button-secondary">
                   Track package
                 </button>
               </a>
             </div>
           </div>
         </div>
 
   `
   orderHTML += orderhtml;

   document.querySelector('.js-orders-grid').innerHTML = orderHTML;


 });
}
*/

function renderOrderPage() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const date = dayjs(order.orderTime);
    const formattedDate = date.format('MMMM D, YYYY');
    const totalCostCents = formatCurrency(order.totalCostCents);
    const orderId = order.id;

     //Generate all product items for this order
    let productsHTML = '';

    order.products.forEach((orderProduct) => {
      const product = getProduct(orderProduct.productId);
      if (!product) return;  //Skip if product not found

      const quantity = orderProduct.quantity;
      const deliveryDate = new Date(orderProduct.estimatedDeliveryTime);
      const formattedDate = deliveryDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

      productsHTML += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${formattedDate}
            </div>
            <div class="product-quantity">
              Quantity: ${quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="#">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });

     //Wrap order header and all its product items
    const orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalCostCents}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        ${productsHTML}
      </div>
    `;

    ordersHTML += orderHTML;
  });

  
  
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  
};



function updateCartQuantity() {
  let orderQuantity = orders.length
    document.querySelector('.js-cart-quantity').innerHTML = orderQuantity;
    const orderForm = orderQuantity <= 1 ? document.querySelector('.js-cart-text').innerHTML = 'Order' : document.querySelector('.js-cart-text').innerHTML = 'Orders'
  
 }
 updateCartQuantity();
