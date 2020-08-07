/* Creates global variables */

const randomUserGeneratorUrl = 'https://randomuser.me/api?results=12'
const cards = document.querySelectorAll('.card')
const searchContainer = document.querySelector('.search-container')


/* Creates a reusable data fetching function */
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error));
}

/* Creates a function to check if the promise resolved with the response objects ok property set to true*/
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText()));
}

/*Calls the fetching function passing it the url of the API to send a single request */
fetchData(randomUserGeneratorUrl)
    .then(data => {
        //Calls the function to get and display 12 users along with some baic info
        displayRandomUsers(data.results)
            //Calls the function to add a search bar that filters the directory by name
            .then(addSearchComponent())
    })


/* Creates a function that uses the response data to display 12 users */
function displayRandomUsers(data) {

    data.map((user, index) => {
        const newCardDiv = document.createElement('div')
        newCardDiv.setAttribute('class', 'card')

        const gallery = document.querySelector('#gallery')
        gallery.appendChild(newCardDiv)

        newCardDiv.innerHTML = `<div class="card-img-container">
        <img class="card-img" src=${user.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>`;
        //Adds a click event to listen for in each new user card div
        newCardDiv.addEventListener('click', () => {
            // Calls the function to create a modal window with more detailed info about the user
            createModalWindow(data, index)

        })



    })
    return data
}


/*Creates a function to create a modal window with more detailed info about the user*/
function createModalWindow(data, userIndex) {
    const user = data[userIndex]
    //Formates the date of the user birth
    const date = new Date(user.dob.date)
    userBirthDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()


    const userCellNum = formatPhoneNumber(user.cell)
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
    //Adds an event listener on the modal window button to close it
    button.addEventListener('click', () => {
        modalContainer.remove()

    })


}


/*Creates a function to format the users phone number.

code adapted from https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/*/
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString

}


// Creates a function to add a search component
function addSearchComponent() {
    searchForm = document.createElement('form')
    searchForm.setAttribute('action', '#')
    searchForm.setAttribute('method', 'get')

    searchContainer.appendChild(searchForm)

    searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                             <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;


    const cards = document.querySelectorAll('.card');
    const searchField = document.getElementById('search-input');
    const button = document.getElementById('search-submit');

    /* creates search component functionality(click) */
    function searchEmployees(searchInput, names) {
        const searchContent = searchInput.value;
        const input = searchContent.toString().toLowerCase();

        for (let i = 0; i < names.length; i += 1) {
            const searchName = names[i].querySelector('h3');
            const stringName = searchName.textContent.toString().toLowerCase()
            const match = stringName.indexOf(input);

            if (match !== -1) {
                names[i].style.display = '';
            } else {
                names[i].style.display = 'none';
            }
        }
    }


    //Adds an event listener to the submit button
    button.addEventListener('click', (e) => {
        e.preventDefault()
        searchEmployees(searchField, cards)

    })





}
