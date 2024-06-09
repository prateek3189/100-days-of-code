const deleteProductButtonElements =
  document.querySelectorAll(".delete-product");

async function deleteProduct(event) {
  if (!confirm("Are you sure you want to delete?")) {
    return;
  }
  const buttonElement = event.target;
  const productId = buttonElement.dataset.id;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Somthing went wrong");
    console.log(response);
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}
