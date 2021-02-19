// TO Do List
// [X] Do a defaul page with the selector
// [X] Fix the timezone
// [X] Animation bounce
// [] Accordion for upcoming forecast
// [] Add gradient to our CSS




// All the DOMs are here
const selectCity = document.getElementById("select-city")
const cityName = document.getElementById("cityName")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")
const forecast = document.getElementById("forecast")
const container = document.querySelector(".container") // We are getting a class from index that why we use querySelector
const body = document.querySelector(".body")
const upcomingWeatherText = document.getElementById("upcoming-weather")


//Selector
//let selection = document.querySelector("select")
//let result = document.querySelector("h2")

// TO do = Find how you can get access to the upcoming 5 days weather forecast. 
// Global Variable

//--------------Tog bort denna som test-------------------------
//const OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"
//http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=3c8d0ca53cf60cf5802dc4c0325edd88

// Global Variable
let cloudSun = "./pics/Group34.png"
let Rise = "./pics/sunrise.png"
let Sunset = "./pics/1.webp"


// selection.addEventListener("change", () => { 
//   sel = selection.options[selection.selectedIndex].value
//   //result.innerText = sel;

  //let OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"





  const SthlmTemp = (userChoice) => {
    const OurAPI = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${userChoice}&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric` 
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {

      
        
        // Local Variables 
        const weatherToday = json.list[0]["weather"][0]["description"]
        const city = json.city["name"]
        const currentWeatherIcon = json.list[0]["weather"][0]["icon"]
        const tempToday = Math.round(json.list[0]["temp"]["day"])
        const minTempToday = Math.round(json.list[0]["temp"]["min"])
        const maxTempToday = Math.round(json.list[0]["temp"]["max"])
        const currentWeatherBackground = json.list[0]["weather"][0]["main"]
      
        //Timezone
        const TimeZone = json.city.timezone;
        const timezoneOffSet = new Date().getTimezoneOffset()*60;
        
        //Sunrise time
        const sunRiseUnix = json.list[0].sunrise;
        const sunriseDate = new Date((sunRiseUnix + TimeZone + timezoneOffSet)*1000);
        //sunRise.innerHTML = sunriseDate.getHours() >9? `Sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()} <img src=${Rise} width="40">` : `Sunrise: 0${sunriseDate.getHours()}:${sunriseDate.getMinutes()} <img src=${Rise} width="40">`
        
        sunRise.innerHTML = sunriseDate.getHours()>9? `<span class="sun-class">Sunrise: ${sunriseDate.getHours()}:</span>`: `<span class="sun-class">Sunrise: 0${sunriseDate.getHours()}:</span>`
        sunRise.innerHTML += sunriseDate.getMinutes()>9? `<span class="sun-class"> ${sunriseDate.getMinutes()} <img src=${Rise} width="40">`:`<span class="sun-class"> 0${sunriseDate.getMinutes()} <img src=${Rise} width="40">`
        //Sunset time
        const sunSetUnix = json.list[0].sunset;
        const sunsetDate = new Date((sunSetUnix + TimeZone + timezoneOffSet)*1000)
        //sunSet.innerHTML = sunsetDate.getHours() >9 ? `Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()} <img src=${Sunset} width="40">` : `Sunset: 0${sunsetDate.getHours()}:${sunsetDate.getMinutes()} <img src=${Sunset} width="40">`;
        //sunSet.innerHTML = sunsetDate.getMinutes() >9 ? `Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()} <img src=${Sunset} width="40">` : `Sunset: ${sunsetDate.getHours()}:0${sunsetDate.getMinutes()} <img src=${Sunset} width="40">`;
        sunSet.innerHTML = sunsetDate.getHours()>9? `<span class="sun-class">Sunrise: ${sunsetDate.getHours()}:</span>`: `<span class="sun-class">Sunrise: 0${sunsetDate.getHours()}:</span>`
        sunSet.innerHTML += sunsetDate.getMinutes()>9? `<span class="sun-class"> ${sunsetDate.getMinutes()} <img src=${Sunset} width="40">`:`<span class="sun-class"> 0${sunsetDate.getMinutes()} <img src=${Sunset} width="40">`

        //Temperature for 10 days
        const temperatureArrayDays =  Array.from(
            json.list, item => item.temp.day
        );
        //Rounding the temperature to integer and replacing the array above by using .Map
        const temperatureArrayDaysRounded = temperatureArrayDays.map((element) => {
          const roundedTemp = Math.round(Number(element));
          return roundedTemp
        });
        //Temperature 5 days (We only select day 1 to 5 out of our 10 days)
        const temperatureFiveDays = temperatureArrayDaysRounded.filter((day, index) => {
          return index > 0 && index < 6
        });
        console.log(temperatureFiveDays);
        //Temperature current day
        const tempertureCurrentDay = temperatureArrayDaysRounded[0];
        
        //Day of the week
        const dateArray = Array.from(
          json.list, item => item.dt
      );
        const newDateArray = dateArray.map( (date) =>{
            const launchDate = new Date((date)*1000);
            const dateDateString = launchDate.toLocaleDateString('en-US', {
                weekday:'short',
            });
            return dateDateString
        });
        //Five days
        const dateFiveDays = newDateArray.filter ((date, index) => {
          return index > 0 && index < 6
        });
        //Date Current Day
        const dateCurrentDay = newDateArray[0];
        console.log(dateCurrentDay)

        //Weather ID
        const weatherIdArray = Array.from(
            json.list, item => item.weather[0].icon // This one starting from 0 and prints out all of our Icons
        );
        //Current Weather ID
        const currentWeatherId = weatherIdArray[0];
        //Weather Five dayes
        const fiveDaysId = weatherIdArray.filter((day, index) => {
            return index >0 && index <6
            }
        )
        //const array = [1, 4, ]

      console.log(fiveDaysId[0])

      // Adding API information into HTML elements 
        cityName.innerHTML = `<h1 class="city-name">${city}</h1>`  
        highlight.innerHTML = `<h2 class="weather-description"> ${weatherToday} <img class="animated-icon" src='http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png'></h2>`
        tempCelsius.innerHTML = `<p class="min-max">Current:  ${tempToday}℃ / Min: ${minTempToday}℃  /Max: ${maxTempToday}℃</p>` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.)
        //sunRise.innerHTML = `<p class="sunrise">The sunrise: ${dateRise} AM <img src=${Rise} width="40"> </p>` 
        //sunSet.innerHTML = `<p class="sunset">The sunset:  ${dateSet} PM <img src=${Sunset} width="40"></p>` //${cloudSun}
        upcomingWeatherText.innerHTML = `<h4>Upcoming Weather Forecast</h4>`

    // for (let i = 0; i < dateFiveDays.length && i < temperatureFiveDays.length; i++) {
    //     dayOne.innerHTML += `<dt>${dateFiveDays[i]}: ${temperatureFiveDays[i]} <img src="http://openweathermap.org/img/wn/11d@2x.png" width="40px" > </dt>`
    // }
    dateFiveDays.forEach((date, index)=>{
      const temperature = temperatureFiveDays[index];
      const icon = fiveDaysId[index];
      dayOne.innerHTML += `<dt class="forecast-line">${date}: ${temperature}℃ <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > </dt>`
    // forecast.innerHTML += `<dt class="forecast-line">${date}: ${temperature} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > </dt>`
    })
    switch (currentWeatherBackground){
      case 'Clouds': {
        container.style.backgroundColor = "#276678"
        highlight.innerHTML += `<h2 class="weather-description"> No sunshine on the horizon!</h2>`
        container.style.color = "#d3e0ea"
        body.style.backgroundColor = "#d3e0ea"
        selectCity.style.color = "#276678"
        selectCity.style.backgroundColor = "#d3e0ea" 
        break;
      }
      case 'Rain':{
        container.style.backgroundColor = "#94b5c0" 
        highlight.innerHTML += `<h2 class="weather-description"> Don't forget your umbrella</h2>`
        container.style.color = "#0a043c"
        body.style.backgroundColor = "#276678" //
        selectCity.style.backgroundColor = "#276678"
        selectCity.style.color = "#94b5c0" 
        break;
      }
      case 'Snow':{
        container.style.backgroundColor = "#d3e0ea"
        highlight.innerHTML += `<h2 class="weather-description"> Time to build a snowman!</h2>`
        container.style.color = "#0a043c"
        body.style.backgroundColor = "#0a043c" //
        selectCity.style.backgroundColor = "#0a043c"
        selectCity.style.color = "#d3e0ea";
        break;
      }
      case 'Thunderstorm':{
        container.style.backgroundColor = "#1687a7"
        highlight.innerHTML += `<h2 class="weather-description"> Hold your hat!</h2>`
        container.style.color = "#f6f5f5"
        body.style.backgroundColor = "#493323"
        selectCity.style.backgroundColor = "#493323"
        selectCity.style.color = "#1687a7";
        break;
      }
      case 'Drizzle':{
        container.style.backgroundColor = "#aaaaaa"
        highlight.innerHTML += `<h2 class="weather-description"> It's just nasty outside... </h2>`
        container.style.color = "#f6f6f6"
        body.style.backgroundColor = "#383e56"
        selectCity.style.backgroundColor = "#383e56"
        selectCity.style.color = "#aaaaaa";
        break;
      }
      case 'Clear':{
        container.style.backgroundColor = "#fce38a"
        highlight.innerHTML += `<h2 class="weather-description"> Don't forget your sunglasses! </h2>`
        container.style.color = "#6b011f"
        body.style.backgroundColor = "#6b011f"
        selectCity.style.backgroundColor = "#6b011f"
        selectCity.style.color = "#fce38a";
        break;
      }
      default :
      container.style.backgroundColor = "#c6a9a3"
      highlight.innerHTML += `<h2 class="weather-description"> Be careful when you are driving!</h2>`
      container.style.color = "#350b40"
      body.style.backgroundColor = "#350b40"
      selectCity.style.backgroundColor = "#350b40"
      selectCity.style.color = "#c6a9a3";
      break;
    }  


    })
}


SthlmTemp('Stockholm')
selectCity.addEventListener('change', () => {
  dayOne.innerHTML = '';
  SthlmTemp(selectCity.value)
}) 