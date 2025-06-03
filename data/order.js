
export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveOrders();
}
export function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// console.log(orders)


