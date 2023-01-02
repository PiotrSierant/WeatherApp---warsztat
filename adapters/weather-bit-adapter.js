import moment from 'moment-timezone';
import get from 'lodash.get';

import { emptyWeatherObject } from './empty-weather-object.js';

export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    try {
      const current = await this.weatherBitApiService.getCurrent(
        cityName.trim(),
      );
      const firstDataObject = get(current, 'data[0]');

      return {
        lastObservationTime:
          get(firstDataObject, 'ob_time') && get(firstDataObject, 'timezone')
            ? new Date(
                moment
                  .tz(firstDataObject.ob_time, firstDataObject.timezone)
                  .format(),
              )
            : null,
        location: {
          cityName: get(firstDataObject, 'city_name'),
          countryCode: get(firstDataObject, 'country_code'),
        },
        weather: {
          currentTemperature: get(firstDataObject, 'temp'),
          minTemperature: null, // API does not provide this information
          maxTemperature: null, // API does not provide this information
          units: 'C',
          description: get(firstDataObject, 'weather.description'),
          iconUrl: this.weatherBitApiService.getIconUrl(
            get(firstDataObject, 'weather.icon'),
          ),
        },
      };
    } catch {
      return emptyWeatherObject;
    }
  }
}
