const addToCartButton = document.querySelector("#add-to-cart");
const badgeElements = document.querySelectorAll("#cart-badge");
async function addToCart() {
  let response;
  try {
    const productId = addToCartButton.dataset.productid;
    const csrfToken = addToCartButton.dataset.csrf;
    const response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: { "Content-type": "application/json" },
    });

    if (!response.ok) {
      alert("Error: Something went wrong");
    }

    const responseData = await response.json();
    const newTotalQuantity = responseData.newTotalItems;
    for (const badgeElement of badgeElements) {
      badgeElement.textContent = newTotalQuantity;
    }
  } catch (e) {
    alert("Error: Something went wrong");
  }
}

addToCartButton.addEventListener("click", addToCart);
