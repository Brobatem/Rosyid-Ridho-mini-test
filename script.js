// script untuk nomer 1
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

function generateFooBarList() {
  const result = [];
  for (let i = 100; i >= 1; i--) {
    if (isPrime(i)) {
      result.push("");
    } else {
      let text = "";
      if (i % 3 === 0) text += "Foo";
      if (i % 5 === 0) text += "Bar";
      if (text === "") text = i.toString();
      result.push(text);
    }
  }
  return result.join(", ");
}

const FooBarList = generateFooBarList();
document.getElementById("FooBar").textContent = FooBarList;

// script untuk nomer 2
const apiKey = "c21ef7a3714b63e0442639188a1ee144";

async function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta,id&units=metric&cnt=40&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function displayWeatherForecast() {
  const weatherForecastDiv = document.getElementById("weatherForecast");
  const weatherData = await fetchWeatherData();

  if (!weatherData || !weatherData.list) {
    weatherForecastDiv.innerHTML = "Failed to fetch weather data.";
    return;
  }

  weatherForecastDiv.innerHTML = "<h2>Weather Forecast In Jakarta :</h2>";

  const forecasts = weatherData.list;
  const dailyForecasts = [];

  // Memisahkan data cuaca per hari
  for (let i = 0; i < forecasts.length; i += 8) {
    dailyForecasts.push(forecasts[i]);
  }

  dailyForecasts.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const formattedDate = date.toDateString();
    const temperature = item.main.temp.toFixed(2);

    const forecastItem = document.createElement("p");
    forecastItem.textContent = `${formattedDate}: ${temperature}°C`;

    weatherForecastDiv.appendChild(forecastItem);
  });
}

displayWeatherForecast();
