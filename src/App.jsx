import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCurrentWeatherData, getGeocoding } from './utils/OpenWeatherUtils';
import { useEffect, useState } from 'react';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const initialHistory = JSON.parse(storedHistory);
    return initialHistory || [];
  });
  const [searchHasError, setSearchHasError] = useState(false);

  const searchWeather = async (country) => {
    const query = country.join(',');

    const weatherResult = await getGeocoding(query)
    .then((result) => {
      return getCurrentWeatherData(result.lat, result.lon);
    })
    .catch((e) => {
      console.log(e.message);
      setSearchHasError(true);
    });

    if(weatherResult) {
      const newSearchHistory = [...searchHistory];
      newSearchHistory.unshift(weatherResult);
      setSearchHistory(newSearchHistory);

      setCurrentWeather(weatherResult);
      setSearchHasError(false)
    }
  }

  const removeHistory = (index) => {
    const newSearchHistory = searchHistory.toSpliced(index, 1);
    setSearchHistory(newSearchHistory);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fromDataValues = Array.from(formData.values());

    await searchWeather(fromDataValues)
  }

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

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

      {searchHasError && <h1>ERROR</h1>}

      {(currentWeather && !searchHasError) &&
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
          {searchHistory.map((history, index) =>
            <div key={index}>
              <h1>{history.country.name}</h1>
              <h1>{history.country.code}</h1>
              <h1>{history.time}</h1>
              <Button
                type='button'
                onClick={() => searchWeather([history.country.name, history.country.code])}
                >
                  Search
                  </Button>
              <Button
                type='button'
                onClick={() => removeHistory(index)}
              >
                Delete
                </Button>
            </div>
          )}
      </div>

    </div>
  );
}

export default App;
