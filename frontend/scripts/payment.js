// Payment functionality (dummy)
const paymentForm = document.getElementById("paymentForm");
const confirmation = document.getElementById("confirmation");

paymentForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const orderId = document.getElementById("orderId").value.trim();
  if (!orderId) {
    alert("Please enter Order ID");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/api/orders/pay/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      confirmation.classList.remove("hidden");
      confirmation.textContent = "✅ Payment successful! Order ID: " + orderId;
      paymentForm.classList.add("hidden");
    } else {
      alert(data.message || "Payment failed");
    }
  } catch (err) {
    alert("Error connecting to server");
  }
});