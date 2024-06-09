const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const productId = form.dataset.productid;
  const csrf = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  try {
    const response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrf,
        quantity: quantity,
      }),
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    });

    if (!response.ok) {
      alert("Error: Something went wrong");
      return;
    }

    const responseData = await response.json();
    if (responseData.updatedItemPrice === 0) {
      form.parentElement.parentElement.remove();
    } else {
      const cartItemTotalPriceElement =
        form.parentElement.querySelector("#cart-item-price");
      cartItemTotalPriceElement.textContent =
        responseData.updatedItemPrice.toFixed(2);
    }

    cartTotalPriceElement.textContent = responseData.newTotalPrice.toFixed(2);
    for (const cartBadgeElement of cartBadgeElements) {
      cartBadgeElement.textContent = responseData.newTotalQuantity;
    }
  } catch (e) {
    alert("Error: Something went wrong");
    return;
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
