import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDistance } from '../api/distance';
import { calculateDistance } from '../utils/distance';
import { DistanceResponse } from '../utils/types'

interface Props {
    searchResults: DistanceResponse
}
interface smallTableCopmponent {
    desc: string,
    value:string|number
}

const SearchResults: React.FC<Props> = (props) => {
    const [smallTableComponents, setSmallTableComponents] = React.useState<smallTableCopmponent[]>([
        {
            desc: "Origin",
            value:  props.searchResults.distanceBtnCities[0]?.city1.name 
        },
        {
            desc: "Destination",
            value: props.searchResults.distanceBtnCities[props.searchResults.distanceBtnCities.length-1]?.city2.name
        },
        {
            desc: "Departure",
            value: props.searchResults?.date
        },
        {
            desc: "Total distance",
            value: props.searchResults?.distanceBtnOriginAndDestination
        },
        {
            desc: "Arrival",
            value: props.searchResults?.date
        },
        {
            desc: "Passengers",
            value: props.searchResults?.passengers
        },
    ])
    React.useEffect(() => {
        setSmallTableComponents(
            [
                {
                    desc: "Origin",
                    value: props.searchResults.distanceBtnCities[0]?.city1.name
                },
                {
                    desc: "Destination",
                    value: props.searchResults.distanceBtnCities[props.searchResults.distanceBtnCities.length - 1]?.city2.name
                },
                {
                    desc: "Departure",
                    value: props.searchResults?.date
                },
                {
                    desc: "Total distance",
                    value: props.searchResults?.distanceBtnOriginAndDestination
                },
                {
                    desc: "Arrival",
                    value: props.searchResults?.date
                },
                {
                    desc: "Passengers",
                    value: props.searchResults?.passengers
                },
            ]
        )
    }, [props.searchResults])
    return (
        <div className=' flex w-full p-5 min-h-screen justify-center items-center bg-white'>
            <div className="flex w-full md:w-[800px] min-h-[650px] space-y-10 p-5 rounded-md flex-col">
                <h1 className="text-3xl font-extralight text-purple-900">Your Flight Details</h1>
                <p className="text-xl font-semibold text-purple-900">{props.searchResults?.date}</p>
                <div className="flex  bg-gray-100 flex-col w-full space-y-4">
                    <div className="flex p-5 flex-row justify-between w-full">
                        <h5 className="w-fit text-[70px] font-bold mt-5 text-purple-900">{props.searchResults?.distanceBtnCities[0]?.city1.name}</h5>
                        <img src={"airplane.gif"} className="w-52 h-40 object-contain rounded-md " />
                       
                        <h5 className="w-fit text-[70px] font-bold mt-5 text-purple-900">{props.searchResults?.distanceBtnCities[props.searchResults?.distanceBtnCities.length-1]?.city2.name}</h5>
                    </div>
                    <div className="flex flex-row p-5 justify-between">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="flex flex-col space-y-2 w-fit mr-2">
                                    <p className="text-gray-500">Departure</p>
                                    <p className="text-gray-500">Check-in</p>
                                    <p className="text-gray-500">Passengers</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-gray-500">{props.searchResults?.date}</p>
                                    <p className="text-gray-500">Enabled</p>
                                    <p className="text-gray-500">{props.searchResults?.passengers}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                        {props.searchResults?.distanceBtnCities.map(distanceDesc => (
                            <div className="flex flex-row   ">
                                <p className="w-28 mr-2 text-gray-500">{distanceDesc?.city1?.name} - {distanceDesc?.city2?.name}</p>
                                    <p className="text-gray-500">: &nbsp;{distanceDesc?.routeDistance} Km</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="flex flex-col space-y-2 w-fit mr-2">
                                    <p className="text-gray-500">Arrival</p>
                                    <p className="text-gray-500">Total distance</p>
                                    <p className="text-gray-500">On Time</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-gray-500">{props.searchResults?.date}</p>
                                    <p className="text-gray-500">{props.searchResults?.distanceBtnOriginAndDestination} Km   </p>
                                    <div className="flex flex-row space-x-2">
                                        <div className="flex w-3 h-3 mt-1.5 rounded-full bg-green-600" />
                                        <p>True</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full border-t">
                        {smallTableComponents.map(component => (

                        <div className="flex flex-col w-1/6 border-2 border-r ">
                                <div className="flex  justify-center items-center h-10  w-full text-purple-900    border-b font-bold">
                                    {component.desc} </div>
                                <div className="flex  justify-center items-center h-10 w-full">{component.value}</div>
                        </div>
                            ))}

                        </div>
                </div>
            </div>

      </div>
    );
  };
  
  export default SearchResults;
  