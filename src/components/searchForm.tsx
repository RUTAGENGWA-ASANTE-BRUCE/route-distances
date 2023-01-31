import React, { useState } from 'react'
import AirplanemodeActive from '@mui/icons-material/AirplanemodeActive'
import SingleInputComboBox from './SingleInputComboBox'
import MultipleInputComboBox from './MultipleInputComboBox'
import { getCities, getCities2 } from '../api/cities';
import UnLoadingSingleInputComboBox from './UnLoadingSingleInputComboBox'
import { DatePickerDescktop, DatePickerMobile } from './DatePickers'
import Button from '@material-ui/core/Button';
import * as yup from "yup";
import { City, formErrors, DistanceResponse } from '../utils/types'
import dayjs from 'dayjs'
import { getDistance } from '../api/distance';
import { Link } from 'react-router-dom'

    interface MyFormValues {
      cityOfOrigin: string;
      cityOfDestination: string;
      numberOfPassengers: string;
      intermidiateCities: string;
      dateOfTrip: string;

    }

    const validationSchema = yup.object({
      cityOfOrigin: yup
        .string()
        .required('City of origin is required'),
      cityOfDestination: yup
        .string()
        .required('City of destination is required'),
      numberOfPassengers: yup
        .string()
        .required('Number of passengers is required'),
      intermidiateCities: yup
        .string().required("at least one intermidate city is required"),
      dateOfTrip: yup.string().required("Please specify the trip date")
    });

    interface Props {

    }


    const SearchForm: React.FC<Props> = (props) => {
        const [origin, setOrigin] = React.useState<City | null>(null);
        const [destination, setDestination] = React.useState<City | null>(null);
        const [intermediateCities, setIntermediateCities] = React.useState<City[]| null>([]);
        const [date, setDate] = React.useState<string | null>();
        const [passengers, setPassengers] = React.useState<number | null>(null);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [showForm, setShowForm] = useState<Boolean>(false);
        const [searchResults, setSearchResults] = React.useState<DistanceResponse>({
            distanceBtnCities: [],
            distanceBtnOriginAndDestination: 0,
            passengers: 0,
            date: ""
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [formErrors, setFormErrors] = React.useState<formErrors>({
            origin: '',
            destination: '',
            date: '',
            passengers: '',
        });
      const [isFormValid, setIsFormValid] = React.useState(false);
        const handleOriginSelect = (event: React.SyntheticEvent<Element, Event>, city: City | null) => {
          setOrigin(city);
          setOrigin(city);
        };
        const handleOriginChange = (event: any) => {
            const city:City= event.target.value
            setOrigin(city);
        }
        const handleDestinationSelect = (event: React.SyntheticEvent<Element, Event>, city: City | null) => {
            setDestination(city);
        };

        const handleDestinationChange = (event: any) => {
            const city: City = event.target.value;
            setDestination(city);
        };

        const handlePassengersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const numberOfPassengers = parseInt(event.target.value);
            setPassengers(numberOfPassengers);
        };


        const handleDateSelect = (date: dayjs.Dayjs | null) => {
            setDate(date?.toString());
            
        };

       

        const handleIntermediateCitySelect = (event: React.SyntheticEvent<Element, Event>, cities: City[] | null)  => {
            setIntermediateCities(cities);
        };

        const validateForm = () => {
            let originError = '';
            let destinationError = '';
            let dateError = '';
            let passengersError = '';
            let isFormValid = true;

            if (!origin) {
                originError = 'Please select a city of origin';
                isFormValid = false;
            }

            if (!destination) {
                destinationError = 'Please select a city of destination';
                isFormValid = false;
            }

            if (!date) {
                dateError = 'Please select a date for the trip';
                isFormValid = false;
            }

            if (!passengers) {
                passengersError = 'Please enter the number of passengers';
                isFormValid = false;
            }

            setFormErrors({
                origin: originError,
                destination: destinationError,
                date: dateError,
                passengers: passengersError,
            });
            setIsFormValid(isFormValid);
        };


        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (isFormValid) {
                const formData = {
                    origin,
                    destination,
                    intermediateCities,
                    passengers,
                    date
                }
                console.log(formData);
 
            }
        }
        React.useEffect(() => {

            const params = new URLSearchParams(window.location.search);
            var destinationParam = params.get("destination");
            var originParam =params.get("origin");
            var passengersParam = params.get("passengers");
            var dateParam =params.get("date");
            var intermidiateCitiesParam = String(params.get("intermidiate_cities"))?.split(",")

            const usingParameters = async () => {
                const originCity:City[]= await getCities(String(originParam));
                const destinationCity: City[] = await getCities(String(destinationParam));
                const intermidiateCitiesPassed: City[] = await getCities2(intermidiateCitiesParam);
                if (originParam && originCity.length === 0) {
                    alert(`'${originCity}' city doesn't exist`)
                }
                if (destinationParam && destinationCity.length === 0) {
                    alert(`'${destinationCity}' city doesn't exist`)
                }
                else {
                    setOrigin(originCity[0]);
                    setDestination(destinationCity[0]);
                    setPassengers(parseInt(String(passengersParam)));
                    setDate(dateParam);
                    setIntermediateCities(intermidiateCitiesPassed);

                }
            
                const results = await getDistance(origin, destination, intermediateCities, passengers, date)
                setSearchResults(results);
                console.log(results);
            }

            if (originParam && destinationParam && passengersParam && dateParam && intermidiateCitiesParam) {
                usingParameters()
                
            }

            validateForm();
        }, [origin, destination, date, passengers]);


        return (

        <div className=' flex w-full p-5 min-h-screen justify-center items-center bg-gray-100'>
  
              <form
                  className="flex w-full md:w-[500px] min-h-[600px] space-y-4 p-5 bg-white rounded-md flex-col" onSubmit={handleSubmit }>
              
              <div className='flex w-full space-4 justify-center'>
                <AirplanemodeActive className='rotate-90 text-purple-700' fontSize='large' />
                <h5 className="text-3xl font-extralight">FLY</h5>
              </div>
                  <p className='text-center w-full mt-5'>Analyze your destination better</p>
                  <SingleInputComboBox value={origin} formError={formErrors.origin} handleSelect={handleOriginSelect} handleChange={handleOriginChange} formPartLabel={"City of origin"} />
                  <SingleInputComboBox value={destination} formError={formErrors.destination} handleSelect={handleDestinationSelect} handleChange={handleDestinationChange} formPartLabel={"City of destination"} />
                  <MultipleInputComboBox value={intermediateCities} handleSelect={handleIntermediateCitySelect} formPartLabel={"Intermediate cities"} />
                  <UnLoadingSingleInputComboBox value={passengers} type={"number"} handleChange={handlePassengersChange} formError={formErrors.passengers} formPartLabel={"Number of passengers"} />
                    <DatePickerDescktop formError={formErrors.date} handleSelect={handleDateSelect} formPartLabel={"Date of trip"} />
                    <Link to={isFormValid ? `/search_results?origin=${origin?.name}&destination=${destination?.name}&date=${date}&passengers=${passengers}&intermidiate_cities=${intermediateCities?.map(city => city.name).join(',')}` : ""}>

                      <Button style={{ color: "white", background: "rgb(126 34 206)", padding:10 }} color="primary" variant="contained" fullWidth type="submit">
                        Submit
                       </Button>
                    </Link>
            </form>
                </div>
       
      )
    }

    export default SearchForm