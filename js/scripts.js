const randomUserGeneratorUrl = 'https://randomuser.me/api?results=12'
const card = document.querySelector('.card')
const cards = document.querySelectorAll('.card')


function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error));
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText()));
}

fetchData(randomUserGeneratorUrl)
    .then(data => {
        displayRandomUsers(data.results)



    })


function displayRandomUsers(data) {

    data.map((user, index) => {
        const newCardDiv = document.createElement('div')
        newCardDiv.setAttribute('class', 'card')

        gallery.appendChild(newCardDiv)

        newCardDiv.innerHTML = `<div class="card-img-container">
        <img class="card-img" src=${user.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>`;

        newCardDiv.addEventListener('click', () => {
            createModalWindow(data, index)
        })



    })

}



function createModalWindow(data, userIndex) {

    const user = data[userIndex]

    const date = new Date(user.dob.date)
    userBirthDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()

    const phonenumLength = user.cell
    console.log(phonenumLength.length)
    const userCellNum = formatPhoneNumber(user.cell)



    const gallery = document.querySelector('#gallery')
    const script = document.querySelector('script')

    const modalContainer = document.createElement('div')
    modalContainer.setAttribute('class', 'modal-container')

    script.parentNode.insertBefore(modalContainer, script)

    modalContainer.innerHTML = `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                 <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                 <p class="modal-text">${user.email}</p>
                 <p class="modal-text cap">${user.location.city}</p>
                 <hr>
                 <p class="modal-text">${userCellNum}</p>
                 <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.postcode}</p>
                 <p class="modal-text">Birthday: ${userBirthDate} </p>
                       </div>`;


    const button = document.querySelector('#modal-close-btn')
    console.log(button)

    button.addEventListener('click', () => {
        modalContainer.remove()


    })


}



function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString
}

// const button = document.querySelector('#modal-close-btn')

// button.addEventListener('click', ()=>{


// })



