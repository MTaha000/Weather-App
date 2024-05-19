let apiKEY = "c6d9cd7c610a9cfc356052ce7d18f547"
let apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

let search = document.querySelector(".search-box input")
let searchbtn = document.querySelector(".search-box button")
let weathericon = document.querySelector(".weather-title img")

function checkWeather(city) {
    // Animation 
    document.querySelector(".dummy-text").classList.add("dummy-text-none")
    document.querySelector(".temp").classList.add("city-temp-anim")
    document.querySelector(".city").classList.add("city-temp-anim")
    weathericon.classList.add("weather-img-anim")

    fetch(apiURL + city + `&appid=${apiKEY}`)
        .then((result) => {
            return result.json();
        }).then((data) => {

            // Validation 

            if (data.name === undefined) {
                search.classList.add("submitionError")
                search.value = "";
                search.placeholder = "Please Enter a Correct Name";
                document.querySelector(".humidity").innerHTML = "";
                document.querySelector(".wind").innerHTML = "";

                // Animation 
                document.querySelector(".dummy-text").classList.remove("dummy-text-none")
                document.querySelector(".temp").classList.remove("city-temp-anim")
                document.querySelector(".city").classList.remove("city-temp-anim")
                weathericon.classList.remove("weather-img-anim")
                return;
            } else {
                search.classList.remove("submitionError")
                search.placeholder = "Enter City Name";
            }

            document.querySelector(".city").innerHTML = data.name
            document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C"
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

            if (data.weather[0].main == "Clouds") {
                weathericon.src = "./Images/clouds.png"
            } else if (data.weather[0].main == "Rain") {
                weathericon.src = "./Images/rain.png"
            } else if (data.weather[0].main == "Mist") {
                weathericon.src = "./Images/mist.png"
            } else if (data.weather[0].main == "Drizzle") {
                weathericon.src = "./Images/drizzle.png"
            } else if (data.weather[0].main == "Clear") {
                weathericon.src = "./Images/clear.png"
            } else if (data.weather[0].main == "Smoke") {
                weathericon.src = "./Images/smoke.png"
            } else if (data.weather[0].main == "Haze") {
                weathericon.src = "./Images/haze.png"
            }
        })

}

searchbtn.addEventListener("click", () => {
    checkWeather(search.value)
})
search.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        checkWeather(search.value)
    } else if (e.code == "Backspace") {
        // Animation 
        document.querySelector(".dummy-text").classList.remove("dummy-text-none")
        document.querySelector(".temp").classList.remove("city-temp-anim")
        document.querySelector(".city").classList.remove("city-temp-anim")
        weathericon.classList.remove("weather-img-anim")
    }

})


// Background Changer 

let mainContainer = document.querySelector(".main-container")

let Background = 0
const backgroundChanger = () => {

    mainContainer.style.backgroundImage = `url(../Images/bg${Background}.webp)`;

    setTimeout(() => {
        if (Background === 12) {
            Background = 0;
        } else {
            ++Background
        }
        backgroundChanger()
    }, 10000)
}
backgroundChanger();

// Screen Animation 

let weatherBoard = document.querySelector(".main-box")
let weatherTitle = document.querySelector(".main-title")

if (window.location.reload) {
    setTimeout(() => {
        weatherTitle.classList.add('screenAnimation')
        weatherBoard.classList.add('screenAnimation')
    }, 500)
}
