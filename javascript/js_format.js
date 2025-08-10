document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    const location = document.getElementById('locationInput').value;
  
    if (location) {
      fetchWeather(location);
    } else {
      alert('Please enter a location.');
    }
  });
  
  function fetchWeather(location) {
    const apiKey = 'ffc85f57af49448b81e92630252801'; // Your API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
        } else {
          displayWeather(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const locationName = data.location.name;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
  
    weatherResult.innerHTML = `
      <h2>${locationName}</h2>
      <p>Temperature: ${temperature}°C</p>
      <p>Condition: ${condition}</p>
      <img src="${icon}" alt="${condition}">
    `;
  }