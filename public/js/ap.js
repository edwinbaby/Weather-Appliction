console.log("javascript loaded")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=> {
   
    e.preventDefault()
    const location = search.value
    //console.log(location)
    messageOne.textContent="Loading....."
    messageTwo.textContent=''
fetch('http://localhost:3000/weather?address='+location).then((response)=> {

   response.json().then((data)=> {

    if(data.error)
    { 
        messageOne.textContent= "Unable to find the location"
    }
    else {
        messageOne.textContent= data.Place
        messageTwo.textContent=data.forecast        
    }
 
   })
 

})

})