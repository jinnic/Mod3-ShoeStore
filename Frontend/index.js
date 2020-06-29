const reviewsList = document.querySelector("#reviews-list")

fetchShoes()


function fetchShoes() {
  fetch("http://localhost:3000/shoes")
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      console.log(json)
      json.forEach(function (shoeObj) {
        renderShoe(shoeObj)
      })
      renderMainShoe(json[0])
    })
}

function renderShoe(shoeObj) {
  const shoeList = document.querySelector("#shoe-list")
  // shoeList.innerHTML += `
  // <li class="list-group-item">${shoeObj.name}</li>
  // `
  const shoeLi = document.createElement("li")
  shoeLi.className = "list-group-item"
  shoeLi.innerText = shoeObj.name
  shoeList.append(shoeLi)

  shoeLi.addEventListener("click", function (e) {
    renderMainShoe(shoeObj)
  })
}

function renderMainShoe(shoeObj) {
  const shoeDetailContainer = document.querySelector("#shoe-details")
  shoeDetailContainer.innerHTML = `
    
    <img class="card-img-top" src="${shoeObj.image}" id="shoe-image" alt="Shoe Image Goes Here">
    <div class="card-body">
      <h4 class="card-title" id="shoe-name">${shoeObj.name}</h4>
      <p class="card-text" id="shoe-description">${shoeObj.description}</p>
      <p class="card-text"><small class="text-muted" id="shoe-price">${shoeObj.price}</small></p>
    </div>
    
    <form id="new-review">
    <div class="form-group">
      <textarea class="form-control" name="content" id="review-content" rows="3"></textarea>
      <input type="submit" class="btn btn-primary"></input>
    </div>
  </form>`

  renderReviews(shoeObj.reviews)
  addReview(shoeObj)

}

function renderReviews(reviews) {
  reviewsList.innerHTML = ""
  reviews.forEach(function (review) {
    console.log(review.content)
    const reviewLi = document.createElement("li")
    reviewLi.innerText = review.content
    reviewLi.className = "list-group-item"
    reviewsList.append(reviewLi)
  })
}



function addReview(shoeObj) {
  const newReview = document.querySelector("#new-review")
  newReview.addEventListener("submit", function (e) {
    e.preventDefault();
    //patch req
    const postObj = {
      content: e.target.content.value
    }
    patchReq(postObj, shoeObj)
    newReview.reset()
  })
}


function patchReq(postObj, shoeObj) {
  const configObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(postObj)
  }
  fetch(`http://localhost:3000/shoes/${shoeObj.id}/reviews`, configObj)
    .then(function (res) {
      return res.json()
    })
    .then(function (obj) {
      console.log(obj)
      reviewsList.innerHTML += `<li class="list-group-item"> ${obj.content} </li>`
    })
}