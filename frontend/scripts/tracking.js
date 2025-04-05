// Tracking functionality (dummy)
const trackingForm = document.getElementById("trackingForm");
const trackingResult = document.getElementById("trackingResult");

trackingForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const trackOrderId = document.getElementById("trackOrderId").value.trim();
  if (!trackOrderId) {
    alert("Please enter a valid Order ID");
    return;
  }
  try {
    const res = await fetch(`http://localhost:8000/api/orders/${trackOrderId}`);
    const data = await res.json();

    if (res.ok) {
      trackingResult.classList.remove("hidden");
      trackingResult.textContent = `🚚 Order Status: ${data.status}`;
    } else {
      alert(data.message || "Order not found");
    }
  } catch (err) {
    alert("Error fetching order");
  }
});
