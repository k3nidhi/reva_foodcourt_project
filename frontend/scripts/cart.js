// Cart functionality (dummy)
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");
const totalElement = document.getElementById("totalAmount");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderSuccess = document.getElementById("orderSuccess");
const orderIdDisplay = document.getElementById("orderId");

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow flex justify-between";
    div.innerHTML = `<div><h2 class='font-bold'>${item.name}</h2><p>₹${item.price}</p></div><div>Qty: ${item.qty}</div>`;
    cartContainer.appendChild(div);
    total += item.price * item.qty;
  });
  totalElement.textContent = total;
}

renderCart();

placeOrderBtn?.addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:8000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    if (res.ok) {
      orderSuccess.classList.remove("hidden");
      orderIdDisplay.textContent = data.orderId;
      localStorage.removeItem("cart");
    } else {
      alert(data.message || "Order failed");
    }
  } catch (err) {
    alert("Server error");
  }
});
