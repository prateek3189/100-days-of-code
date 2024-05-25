const filePicker = document.getElementById("image");
const imagePreview = document.getElementById("file-preview");

function showPreview() {
  const files = filePicker.files;
  if (!files || files.length === 0) {
    imagePreview.style.display = "none";
    return;
  }
  imagePreview.style.display = "block";

  const pickedFiles = files[0];

  imagePreview.src = URL.createObjectURL(pickedFiles);
}

filePicker.addEventListener("change", showPreview);
