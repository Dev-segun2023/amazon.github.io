
function Cart(localStorageKey) {
const cart = {
  cartItem : undefined,

  loadFromStorage() {
  this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) ||[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'   
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}]
},

saveToStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
 },
 addToCart(productId) {
  let matchingItem;
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })
  if(matchingItem){
    matchingItem.quantity++;
  }else{
    this.cartItem.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    })
  }
  this.saveToStorage();
 },
removeFromCart(productId) {
  let newCart = [];
  this.cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  this.cartItem = newCart;
  this.saveToStorage();
  
 },

 updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;
  this.saveToStorage();
}


}

return cart

}


const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');

// cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');

cart.loadFromStorage();
businessCart.loadFromStorage();

businessCart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');


console.log(cart);
console.log(businessCart);




