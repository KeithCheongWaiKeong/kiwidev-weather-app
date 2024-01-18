import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCurrentWeatherData, getGeocoding } from './utils/OpenWeatherUtils';
import { useState } from 'react';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fromDataValues = Array.from(formData.values());

    const result = await getGeocoding(fromDataValues.join(','))
    .then((result) => {
      return getCurrentWeatherData(result.lat, result.lon);
    })
    .catch((e) => {
      console.error(e);
    });

    setCurrentWeather(result);
  }

  return (
    <div className="app">
      <header className="app-header">
        Today's Weather
      </header>
      <Form onSubmit={handleSubmit}>
        <Form.Label>City:</Form.Label>
        <Form.Control name="city"/>
        <Form.Label>Country:</Form.Label>
        <Form.Control name="country"/>
        <Button type="submit">Search</Button>
      </Form>

      {currentWeather &&
        <div className='current-weather'>
          <h4>{`${currentWeather.country.name}, ${currentWeather.country.code}`}</h4>
          <h1>{currentWeather.weather}</h1>
          <h3>{currentWeather.desc}</h3>
          <h4>{`${currentWeather.temp.min} - ${currentWeather.temp.max}`}</h4>
          <h4>{currentWeather.humidity}</h4>
          <h4>{currentWeather.time}</h4>
        </div>
      }

      <div>
        <h2>Search History</h2>
        {/* List of search history, store locally */}
      </div>

    </div>
  );
}

export default App;
