const reviewsList = document.querySelector("#reviews-list")
const newReview = document.querySelector("#new-review")
fetchShoes()
addReview()

function fetchShoes() {
  fetch("http://localhost:3000/shoes")
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      console.log(json)
      json.forEach(renderShoe)
      renderMainShoe(json[0])
    })
}

function renderShoe(shoeObj) {
  const shoeList = document.querySelector("#shoe-list")
  const shoeLi = document.createElement("li")
  shoeLi.className = "list-group-item"
  shoeLi.innerText = shoeObj.name
  shoeList.append(shoeLi)

  shoeLi.addEventListener("click", function (e) {
    renderMainShoe(shoeObj)
  })
}

function renderMainShoe(shoeObj) {
  const mainShoe = document.querySelector("#main-shoe")
  mainShoe.setAttribute("data-id",`${shoeObj.id}`)
  mainShoe.querySelector('img').setAttribute("src", `${shoeObj.image}`)
  mainShoe.querySelector('#shoe-name').textContent = shoeObj.name
  mainShoe.querySelector('#shoe-description').textContent = shoeObj.description
  mainShoe.querySelector('#shoe-price').textContent = shoeObj.price

  const mainShoeReviews = shoeObj.reviews
  renderReviews(mainShoeReviews)

}

function renderReviews(reviews) {
  reviewsList.innerHTML = ""
  reviews.forEach(renderOneReview)
}

function renderOneReview(review){
  console.log(review)
  const reviewLi = document.createElement("li")
    reviewLi.innerText = review.content
    reviewLi.className = "list-group-item"
    reviewsList.append(reviewLi)
}

function addReview() {
  
  newReview.addEventListener("submit", function (e) {
    e.preventDefault();
    // debugger
    const currShoeId = e.target.closest('#main-shoe').dataset.id

    //patch req
    const postObj = {
      content: e.target.content.value
    }
    patchReq(postObj, currShoeId)
    newReview.reset()
  })
}


function patchReq(postObj, currShoeId) {
  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(postObj)
  }
  fetch(`http://localhost:3000/shoes/${currShoeId}/reviews`, configObj)
    .then(function (res) {
      return res.json()
    })
    .then(renderOneReview)
}