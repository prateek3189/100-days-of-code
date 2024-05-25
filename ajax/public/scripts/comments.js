const loadComments = document.getElementById("load-comments");
const commentsSection = document.getElementById("comments");
const commentsForm = document.querySelector("#comments-form form");
const commentTitle = document.getElementById("title");
const commentText = document.getElementById("text");

function createCommentsList(comments) {
  const commentListEl = document.createElement("ol");

  for (const comment of comments) {
    const commentEl = document.createElement("li");
    commentEl.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListEl.appendChild(commentEl);
  }
  return commentListEl;
}

async function loadCommentsForPost() {
  const postId = loadComments.dataset.postid;
  const response = await fetch("/posts/" + postId + "/comments");
  const responseData = await response.json();
  if (!responseData.ok) {
    alert("Error: Something went wrong");
    return;
  }
  const commentListElement = createCommentsList(responseData);
  commentsSection.innerHTML = "";
  commentsSection.appendChild(commentListElement);
}

async function saveComment(e) {
  e.preventDefault();
  const enteredTitle = commentTitle.value;
  const enteredText = commentText.value;

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };
  const postId = loadComments.dataset.postid;
  try {
    const response = await fetch("/posts/" + postId + "/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      loadCommentsForPost();
    } else {
      alert("Could not fetch comments");
    }
  } catch (e) {
    alert("Error !! Could not save comment");
  }
}

loadComments.addEventListener("click", loadCommentsForPost);
commentsForm.addEventListener("submit", saveComment);
