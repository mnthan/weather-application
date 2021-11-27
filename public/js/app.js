console.log('Client side javascript file is loaded')
// fetch("http://localhost:3000/weather?address=boston").then((response)=>{
//     response.json().then(data => {
//         if (data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.temperature)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript File'
// messageTwo.textContent = 'From Javascript File'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

   
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then(data => {
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.temperature
        }
        
    })
})
   
   
})
