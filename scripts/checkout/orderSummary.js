import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { products, getProduct } from "../../data/products.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions, getDeliveryPtions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export  function renderOrdersummary() {
  


let cartSummaryHTML = "";
cart.forEach((cartItem)=>{
const productId = cartItem.productId;


const matchingProduct = getProduct(productId);
const deliveryOptionId = cartItem.deliveryOptionId; 

const deliveryOption = getDeliveryPtions(deliveryOptionId);


const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
  const dateString = deliveryDate.format('dddd, MMMM D')


cartSummaryHTML += `
      <div class="cart-item-container js-cartItem-container-${matchingProduct.id}
      js-cartItem-container
      ">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <!--<span class="update-quantity-link link-primary">
                    Update
                  </span>-->
                  <span class="delete-quantity-link link-primary 
                  js-delete-link-${matchingProduct.id} 
                  js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

               
             

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
                </div>
              </div>
            </div>
          </div>
          
  `
})

function deliveryOptionsHTML(matchingProduct,cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption)=>{
  const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
  const dateString = deliveryDate.format('dddd, MMMM D')

  const priceString = deliveryOptions.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`
  html += 
   `
      <div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                 ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
   `
})
return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
// console.log(cartSummaryHTML);

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cartItem-container-${productId}`);
   
    container.remove()
    renderPaymentSummary();
    
  });
  
});

document.querySelectorAll('.js-delivery-option').forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = option.dataset;
    updateDeliveryOption(productId, deliveryOptionId);

    renderOrdersummary();
    renderPaymentSummary();
  })
})
}

