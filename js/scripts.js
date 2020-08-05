
// /*Creates Search Feature */

// const searchForm = document.createElement('form')
// searchForm.setAttribute('action', '#');
// searchForm.setAttribute('method', 'get')

// const searchContainer = document.querySelector('.search-container')
// searchContainer.appendChild(searchForm)

// const searchInput = document.createElement('input')
// searchInput.setAttribute('type', 'search')
// searchInput.setAttribute('id', 'search-input')
// searchInput.setAttribute('class', 'search-input')
// searchInput.setAttribute('placeholder', 'Search...')

// submitInput = document.createElement('input')
// submitInput.setAttribute('type', 'submit')
// submitInput.setAttribute('value', '&#x1F50D;')
// submitInput.setAttribute('id', 'search-submit')
// submitInput.setAttribute('id', 'search-submit')
// submitInput.setAttribute('class', 'search-submit')

// const form = document.querySelector('form')
// form.appendChild(searchInput)
// form.appendChild(submitInput)

// /*Creates Search Feature */

// const gallery = document.querySelector('#gallery')

// const html = `
//     <div class="card">
//     <div class="card-img-container">
//         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//     </div>
//     <div class="card-info-container">
//         <h3 id="name" class="card-name cap">first last</h3>
//         <p class="card-text">email</p>
//         <p class="card-text cap">city, state</p>
//     </div>
// </div> `

// gallery.innerHTML = html

const randomUserGeneratorUrl = 'https://randomuser.me/api?results=12'

fetch(randomUserGeneratorUrl)
    .then(response => response.json())
    .then(data => createCardHTML(data.results))




function createCardHTML(data) {

    data.map(user => {

        console.log(user.location.city)

        const newCardDiv = document.createElement('div')
        newCardDiv.setAttribute('class', 'card')

        gallery.appendChild(newCardDiv)

        const cardImageContainer = document.createElement('div')
        cardImageContainer.setAttribute('class', 'card-img-container')

        newCardDiv.appendChild(cardImageContainer)

        const userImg = document.createElement('img')
        userImg.setAttribute('src', `${user.picture.large}`)
        userImg.setAttribute('alt', 'profile picture')

        cardImageContainer.appendChild(userImg)

        cardInfoContainer = document.createElement('div')
        cardInfoContainer.setAttribute('class', 'card-info-container')

        newCardDiv.appendChild(cardInfoContainer)

        const userName = document.createElement('h3')
        userName.setAttribute('id', `${user.name.first}`)
        userName.setAttribute('class', 'card-name cap')
        userName.innerHTML = `${user.name.first} ${user.name.last}`

        const userEmail = document.createElement('p')
        userEmail.setAttribute('class', 'card-text')
        userEmail.innerHTML = `${user.email}`

        const userLocation = document.createElement('p')
        userLocation.setAttribute('class', 'card-text cap')
        userLocation.innerHTML = `${user.location.city}, ${user.location.state}`

        cardInfoContainer.appendChild(userName)
        cardInfoContainer.appendChild(userEmail)
        cardInfoContainer.appendChild(userLocation)





    })



}