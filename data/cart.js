export let cart; 

loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) ||[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'   
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}]
}
export function addToCart(productId) {
  let matchingItem;
  const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`)
  const productQuantity = itemQuantity ? parseInt(itemQuantity.value) : 1;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })
  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({
      productId: productId,
      quantity: productQuantity,
      deliveryOptionId: '1'
    })
  }
  saveToStorage();
 }

 export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage();
  
 }
 export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
 }



export  function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}



export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.addEventListener('load', ()=>{
     console.log(xhr.response)
fun();
// console.log(products);
});

  xhr.send();
}