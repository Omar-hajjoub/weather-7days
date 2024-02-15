class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiserchl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    this.apiurl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
    this.serchcityInput = document.getElementById('serchcity');


  }
// Get wayr city weathr Data -------------------------------------
  async getWeatherData(city) {
    const currentWeatherResponse = await fetch(`${this.apiserchl}${city}&appid=${this.apiKey}`);
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(`${this.apiurl}${city}&appid=${this.apiKey}`);
    const forecastData = await forecastResponse.json();

    return { currentWeatherData, forecastData };
  }


  // Get weather data--------------------------
  updateWeatherUI(currentWeather, forecastWeather) {
    const namedays=document.querySelector('.namedays')
    const weatherTableBody = document.querySelector('.whterid');
    let weatherTableHtml = '';
    let weatherTabledayes=''
    let imgtabel=document.querySelector('.iconeimgtabel')


    // ------------ vidio - photo background---------------------------
    const videoElement = document.getElementById('.vidio');
    const weatherDescription = currentWeather.weather[0].description;
 const iconerainy=document.querySelector('.iconerainy')
    switch (weatherDescription) {
      case 'overcast clouds':
        videoElement.src = './vidio/production_id_5204611 (720p).mp4';
        iconerainy.src = './photo/cloudyovercast.png';

        break;
      case 'broken clouds':
        videoElement.src = './vidio/cloude bokein.mp4';
        iconerainy.src = './photo/brokenclouds.png';

        break;
      case 'clear sky':
        videoElement.src = './vidio/clear sky.mp4';
        iconerainy.src = './photo/clear-sky.png';

        break;
      case 'Drizzle':
        videoElement.src = './vidio/storm.png';
        iconerainy.src = './photo/cloudyovercast.png';

        break;
      case 'Mist':
        videoElement.src = './vidio/mist.png';
        iconerainy.src = './photo/cloudyovercast.png';

        break;

        case 'moderate rain':
          videoElement.src = './vidio/mist.png';
          iconerainy.src = './photo/rain.png';
  
          break;
      default:
        // Handle other weather conditions or set a default video
        break;
    }


// fooor Name 7 Days--------------------------------------------------------------------
    let today = new Date();
    console.log(today)
    let daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(let i=0; i<=daysNames.length-1; i++){

      let futureDate = new Date(today);

      futureDate.setDate(today.getDate() + i);

      weatherTabledayes  += `
      <th>${futureDate.toISOString().slice(0,10).replace('/d\/g', '') + " - " + daysNames[futureDate.getDay()]}</th>

      `;

      namedays.innerHTML=weatherTabledayes
    }


    // foor weathr 7 days'''''''''''''(((((((((((((((())))))))))))))))
    for (let i = 0; i < forecastWeather.list.slice(0, 7).length; i++) {
      const forecastWeatherts = forecastWeather.list[i].weather[0];
      console.log(forecastWeatherts)
    
    // if photo wheatrd to days
      switch (forecastWeatherts) {
        case 'overcast clouds':
          imgtabel.src = './photo/cloudyovercast.png';
          break;
        case 'broken clouds':
          imgtabel.src = './photo/brokenclouds.png';
          break;
        case 'clear sky':
          imgtabel.src = './photo/clear-sky.png';
          break;
        case 'Drizzle':
          imgtabel.src = './photo/cloudyovercast.png';
          break;
        case 'Mist':
          imgtabel.src = './photo/cloudyovercast.png';
          break;
          case 'Rain':
            imgtabel.src = './photo/rain.png';
    
            break;
        default:
          // Handle other weather conditions or set a default video
          break;
      }


    
// tabel wheatr for----------------------------
      weatherTableHtml += `
   
        <td>
        <img src="./photo/cloudyovercast.png" alt="" class="iconeimgtabel">
          <p>${forecastWeather.list[i].main.temp} °C</p>
          <span>${forecastWeather.list[i].wind.speed} km/h</span>
          <span>${forecastWeather.list[i].main.humidity}%</span>
        </td>
      `;

    }
 
    weatherTableBody.innerHTML = weatherTableHtml;





    // ---------------------------------------

    const cityElement = document.querySelector('.city');
    cityElement.innerHTML = currentWeather.name;

    const tempElement = document.querySelector('.temp');
    tempElement.innerHTML = Math.round(currentWeather.main.temp) + ' °C';

    const humidityElement = document.querySelector('.humidity');
    humidityElement.innerHTML = currentWeather.main.humidity + '%';

    const windElement = document.querySelector('.wind');
    windElement.innerHTML = currentWeather.wind.speed + ' km/h';
  }

}

// Create an instance of WeatherApp
const weatherApp = new WeatherApp('ad3711942890a60c13633e5a8f592eac');

// Event listener for the search button
document.getElementById('serch').addEventListener('click', async () => {
  const city = weatherApp.serchcityInput.value.replace(/\d/g,'');
  const { currentWeatherData, forecastData } = await weatherApp.getWeatherData(city);
  weatherApp.updateWeatherUI(currentWeatherData, forecastData);
});





  function initMap() {
  

    map = new google.maps.Map(document.getElementById('map'), {
    });
  
    cityAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('serchcity')
    );
    cityAutocomplete.bindTo('bounds', map);
  
  
  }
  
  // coode function a Locate A person
  function locateUser() {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
      
        
        // وضع الموقع في حقل الإدخال
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': userLocation }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
   const address=results[0].formatted_address;
   var words = address.split(',');
   const  lastTwoWords = words.slice(-2,-1);
   
  
            document.getElementById('serchcity').value = lastTwoWords;
  
          }
        });
      }, function() {
        handleLocationError(true);
      });
    } else {
      handleLocationError(false);
    }
  }
  
  
  document.getElementById('locateUser').addEventListener('click',locateUser()) 
  
