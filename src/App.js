import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTours = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.status >= 200 && response.status <= 299) {
        const tours = await response.json();
        setIsLoading(false);
        setTours(tours);
        console.log(tours);
      } else {
        setIsLoading(false);
        setIsError(true);
        throw new Error(tours.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (isError) {
    return (
      <main>
        <h2>Error...</h2>
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no more tours remaining</h2>
          <button className='btn' onClick={fetchData}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTours={removeTours} />
    </main>
  );
}

export default App;
