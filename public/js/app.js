console.log("client side javascript")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{    //fetch data from url then run this function
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector("form")
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {   //e is event object
    e.preventDefault()
    const location=search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    
    fetch('/weather?address='+location).then((response)=>{    //fetch data from url then run this function
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=data.error
        } else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})

})