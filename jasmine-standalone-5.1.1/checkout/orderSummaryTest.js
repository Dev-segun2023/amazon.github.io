import { renderOrdersummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart} from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

describe('Test Suite: renderOr0dersummary', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  beforeAll((done)=>{
   loadProductsFetch().then(()=>{
      done();
    });
     
  });
beforeEach(()=>{
  document.querySelector('.js-test-container').innerHTML= `
  <div class="js-order-summary"></div>
   <div class="js-payment-summary"></div>
  `
  spyOn(localStorage, 'setItem')
    
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([{
       productId:productId,
       quantity: 2,
       deliveryOptionId: '1'   
    },{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }])

  })

   loadFromStorage();
   renderOrdersummary();
 
})

afterEach(()=>{
  document.querySelector('.js-test-container').innerHTML=''
})

  it('it displays the cart', ()=>{
   

        expect(document.querySelectorAll('.js-cartItem-container').length).toEqual(2)
        expect(document.querySelector(`.js-product-quantity-${productId}`).innerText).toContain('Quantity: 2')
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1')

        
  });

  it('removes a product', ()=>{
   
        document.querySelector(`.js-delete-link-${productId}`).click();
        
        expect(document.querySelectorAll('.js-cartItem-container').length).toEqual(1);

        expect(document.querySelector(`.js-cartItem-container-${productId}`)).toEqual(null);

        expect(document.querySelector(`.js-cartItem-container-${productId2}`)).not.toEqual(null);

        
  })

})
