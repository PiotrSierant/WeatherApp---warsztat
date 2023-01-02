import get from 'lodash.get';

import { emptyWeatherObject } from './empty-weather-object.js';

export class OpenWeatherMapAdapter {
  constructor(openWeatherMapAdapter) {
    this.openWeatherMapAdapter = openWeatherMapAdapter;
  }

  async getWeather(cityName) {
    try {
      const weather = await this.openWeatherMapAdapter.getWeather(
        cityName.trim(),
      );

      return {
        lastObservationTime: get(weather, 'dt')
          ? new Date(weather.dt * 1000)
          : null,
        location: {
          cityName: get(weather, 'name'),
          countryCode: get(weather, 'sys.country'),
        },
        weather: {
          currentTemperature: get(weather, 'main.temp'),
          minTemperature: get(weather, 'main.temp_min'),
          maxTemperature: get(weather, 'main.temp_max'),
          units: 'C',
          description: get(weather, 'weather[0].description'),
          iconUrl: this.openWeatherMapAdapter.getIconUrl(
            get(weather, 'weather[0].icon'),
          ),
        },
      };
    } catch {
      return emptyWeatherObject;
    }
  }
}
