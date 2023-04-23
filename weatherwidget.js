import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
  static get properties() {
    return {
      weatherData: { type: Object },
      city: { type: String },
    };
  }

  static properties = {
    _data: {state: true},
  }

static get styles() {
    return css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    h1 {
      font-size: 24px;
      margin-top: 0;
    }
    p {
      font-size: 18px;
      margin: 5px 0;
    }
    .loading {
      font-style: italic;
      color: #888;
    }
  `;
}

  constructor() {
    super();
    this.weatherData = null;
    this.city = 'Sydney'; // Default city
    this.fetchWeatherData();
    this.temperature = 0;
    this.humidity = 0;
    this.wind_speed = 0;
  }

  fetchWeatherData() {
   
    //fetch(`https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&hourly=temperature_2m`)

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=-34.83&longitude=148.92&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)

      .then(response => response.json())
      .then(data => {
        this._data=data;
        //console.log(this._data.hourly.temperature_2m[0]);
        //console.log(this._data.hourly.relativehumidity_2m[0]);
        //console.log(this._data.hourly.windspeed_10m[0]);
        const temperature = this._data.hourly.temperature_2m[0];
        const humidity = this._data.hourly.relativehumidity_2m[0];
        const wind_speed = this._data.hourly.windspeed_10m[0];
        //console.log(temperature);
        //console.log(humidity);
        //console.log(wind_speed);     
  })
      .catch(error => {
        console.log('Error fetching weather data: ');
        console.error(error);
      });
  }

  render() { 
    if (this._data) {
        console.log(this._data);        
        this.temperature = this._data.hourly.temperature_2m[0];
        this.humidity = this._data.hourly.relativehumidity_2m[0];
        this.wind_speed = this._data.hourly.windspeed_10m[0];
       //console.log(this.temperature);
        return html`
        <div>

          <p>Temperature: ${this.temperature} </p>
          <p>Humidity:${this.humidity}</p>
          <p>Wind Speed:${this.wind_speed}</p>


      </div>
      `;

    }else{
        return html`<p>Loading...</p>`;
      }
    }
}


customElements.define('weather-widget', WeatherWidget);




