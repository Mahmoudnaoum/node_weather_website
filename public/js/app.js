const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    fetch('/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
        if( data.error ) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast   
        }
        
    })
})
})