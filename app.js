window.addEventListener('load', () => {
    let long;
    let lat;
    let APIkey = '60c0f58947c73b7e85c6ba3310a93352';
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureFeelsLike = document.querySelector('.temperature-feels-like');
    let temperatureMin = document.querySelector('.temperature-min');
    let temperatureMax = document.querySelector('.temperature-max');
    let pressure = document.querySelector('.pressure');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIkey}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //set DOM Elements from API
                    temperatureDegree.textContent = Math.floor(data.main.temp, 0);
                    console.log(temperatureDescription.textContent = data.weather[0].description);
                    if (data.timezone > 0) {
                        locationTimezone.textContent = '+ ' + (data.timezone / 3600);
                    } else {
                        locationTimezone.textContent = '- ' + (data.timezone / 3600);
                    }
                    temperatureFeelsLike.textContent = Math.floor(data.main.feels_like, 0);
                    temperatureMax.textContent = Math.floor(data.main.temp_max, 0);
                    temperatureMin.textContent = Math.floor(data.main.temp_min, 0);
                    pressure.textContent = Math.floor(data.main.pressure, 0);

                    // set Icon
                    var skycon = new Skycons({ 'color': 'white' });
                    skycon.set(document.querySelector(".icon"), iconCodeConverter(data.weather[0].icon));
                    skycon.play();
                })

        });
    }

    iconCodeConverter = (id) => {
        let idDecoded = '';

        if (id == '01d') {
            idDecoded = 'CLEAR_DAY';
        } else if (id == '01n') {
            idDecoded = 'CLEAR_NIGHT';
        } else if (id == '02d'){
            idDecoded = 'PARTLY_CLOUDY_DAY';
        } else if (id == '02n'){
            idDecoded = 'PARTLY_CLOUDY_NIGHT';
        } else if (id == '03d' || id == '03n' || id == '04d' || id == '04n' ) {
            idDecoded = 'CLOUDY';
        } else if (id == '09d' || id == '09n' || id == '10d' || id == '10n' ) {
            idDecoded = 'RAIN';
        } else if (id == '11d' || id == '11n') {
            idDecoded = 'WIND';
        }else if (id == '13d' || id == '13n') {
            idDecoded = 'SNOW';
        }else {
            idDecoded = 'FOG';
        }
        return idDecoded;
    }

});