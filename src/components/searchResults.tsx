import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDistance } from '../api/distance';
import { calculateDistance } from '../utils/distance';

interface Props {}

const SearchResults: React.FC<Props> = () => {
    const location = useLocation();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [intermediateCities, setIntermediateCities] = useState<string[]>([]);
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [distances, setDistances] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
    //   const { origin, destination, intermediateCities, date, passengers } = new URLSearchParams(location.search);
      setOrigin(origin);
      setDestination(destination);
    //   setIntermediateCities(intermediateCities.split(','));
      setDate(date);
      setPassengers(Number(passengers));
    }, [location]);
  
    useEffect(() => {
      if (origin && destination) {
        setLoading(true);
        setError('');
        const cities = [origin, ...intermediateCities, destination];
       /* getDistance(cities)
          .then((response) => {
            setDistances(response);
            setTotalDistance(response.reduce((a, b) => a + b, 0));
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => setLoading(false));
        */
      }
    }, [origin, destination, intermediateCities]);
  
    return (
      <div>
        {/* display search form data and calculated distances */}
      </div>
    );
  };
  
  export default SearchResults;
  