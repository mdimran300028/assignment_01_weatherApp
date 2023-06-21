const getWeatherData = (req_loc='Dhaka')=>{
    let loader = document.getElementById('loader')
    loader.classList.remove('hide')

    let lat = document.getElementById('latitude').innerText
    let lon = document.getElementById('longitude').innerText

    //weatherAPI
    let appKey = 'd322c21450b14037814152702232106'
    //openWeather
    // let appKey = 'b9d67bb249451a667eeb4d80586a2881'
    // let URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${appKey}`
    let URL = `http://api.weatherapi.com/v1/current.json?key=${appKey} &q=${req_loc}`
    let Configuration = {
        method:"GET"
    }
    fetch(URL,Configuration)
        .then((response)=>{return response.json()})     //without 'return' it will not work
        .then((result)=>{
            loader.classList.add('hide')
            if (result.location){
                let resultLocation = result.location
                let resultWeather = result.current
                //Location Update
                document.getElementById('country').innerText = `${resultLocation.country}`
                document.getElementById('req_area').innerText = `${resultLocation.name}`
                document.getElementById('time_zone').innerText = `${resultLocation.tz_id}`
                document.getElementById('local_time').innerText = `${resultLocation.localtime}`
                document.getElementById('latitude').innerText = `${resultLocation.lat}`
                document.getElementById('longitude').innerText = `${resultLocation.lon}`
                //Weather Update
                document.getElementById('humidity').innerHTML = `${resultWeather.humidity} %`
                document.getElementById('cloud').innerHTML = `${resultWeather.cloud} %`
                document.getElementById('ppt').innerHTML = `${resultWeather.precip_mm} mm`
                document.getElementById('sky_condition').innerHTML = `${resultWeather.condition.text} <img = src="${resultWeather.condition.icon}">`
                document.getElementById('temp').innerHTML = `${resultWeather.temp_c}&deg;C / ${resultWeather.temp_f}&deg;F`
                document.getElementById('feel').innerHTML = `${resultWeather.feelslike_c}&deg;C / ${resultWeather.feelslike_f}&deg;F`
                document.getElementById('day_night').innerHTML = `${resultWeather.is_day==0?'Night':'Day'}`
                document.getElementById('wind_speed').innerHTML = `${resultWeather.wind_kph} kmph from &deg;${resultWeather.wind_degree} ${resultWeather.wind_dir}`
                document.getElementById('pressure').innerHTML = `${resultWeather.pressure_mb} mb`
                document.getElementById('uv').innerHTML = `${resultWeather.pressure_mb} uv`
                document.getElementById('last_update').innerHTML = `${resultWeather.last_updated}`
                console.log(resultLocation)
            }else{
                alert(`${result.error.message}`)
            }
        })
        .catch((error)=>{alert('Something went wrong')})
        // .catch((error)=>{console.log(error)})
}

getWeatherData()

const checkWeather = ()=>{
    let reqLocation = document.getElementById('area').value;
    if (reqLocation !=null || reqLocation != ''){
        getWeatherData(reqLocation);
    }else{
        getWeatherData('Dhaka')
    }
}

// navigator.geolocation.getCurrentPosition((position)=>{
//     document.getElementById('latitude').innerText = position.coords.latitude
//     document.getElementById('longitude').innerText = position.coords.longitude
//     document.getElementById('altitude').innerText = position.coords.altitude
// })


const currentDayTime = ()=>{
    const date = new Date()
    let hour = date.getHours() > 10 ? date.getHours() : '0'+date.getHours()
    let minute = date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes()
    let second = date.getSeconds() > 10 ? date.getSeconds() : '0'+date.getSeconds()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return {
        time:`${hour}:${minute}:${second}`,
        date:`${year}-${month}-${day}`
    }
}

const showDate = ()=>{
    let dayTime = currentDayTime();
    document.getElementById('date').innerHTML = `Today : ${dayTime.date}`
}

const showTime = ()=>{
    let dayTime = currentDayTime()
    document.getElementById('time').innerHTML = `Now : ${dayTime.time}`
}
//Inject Date into DOM
showDate()

//Inject Time into DOM
showTime()

//Inject Updated Time into DOM
setInterval(showTime,1000)
