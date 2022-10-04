function formatDate(timestamp){
    let date = new Date(timestamp)
    let hours = date.getHours()
    if(hours< 10){
        hours=`0${hours}`
    }
    let minutes = date.getMinutes()
    if(minutes< 10){
        minutes=`0${minutes}`
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Sauturday"]
    let day =days[date.getDay()]
    return `${day} ${hours}:${minutes}`
}



function displayTemperature(response){
   let temperatureElement = document.querySelector("#temperature");
   let cityElement=document.querySelector("#city");
   let descriptionElement =document.querySelector("#description")
   let humidityElement =document.querySelector("#humidity")
   let windElement =document.querySelector("#wind")
   let dateElement=document.querySelector("#date")
   let iconElement =document.querySelector("#icon")
   celsiusTemperature=response.data.main.temp
   temperatureElement.innerHTML=Math.round(response.data.main.temp)
   cityElement.innerHTML=response.data.name
   descriptionElement.innerHTML=response.data.weather[0].description
   humidityElement.innerHTML=response.data.main.humidity
   windElement.innerHTML =Math.round(response.data.wind.speed)
   dateElement.innerHTML =formatDate(response.data.dt*1000)
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   )
   iconElement.setAttribute("alt",response.data.weather[0].description)
}
function search(city){
    let apiKey= "1b60c04b0a29fc7192025fa7341885b7";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature)
    
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement =document.querySelector("#city-input")
    search(cityInputElement.value)
}
    let temperatureElement =document.querySelector("#temperature")
    celsiusElement.classList.remove("active");
    fahrenheitElement.classList.add("active")
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32 ;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature)
}
function celsiusLink(event){
    celsiusElement.classList.add("active")
    fahrenheitElement.classList.remove("active")
    event.preventDefault();
    let temperatureElement =document.querySelector("#temperature")
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


let celsiusTemperature =null;

let form =document.querySelector("#searchBtn");
form.addEventListener("click",handleSubmit);
let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click",fahrenheitLink);
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click",celsiusLink);
search("Mohammedia")