import axios from 'axios';
import { calculateDistance } from '../utils/distance';
import { City } from '../utils/types';

interface DistanceResponse {
    distanceBtnOriginAndDestination?: number,
    distanceBtnIntermidiateCities?: DistanceBtnIntermidiateCities[],
    distanceBtnOriginAndFirtsIntermidateCity?: number,
    distanceBtnDestinationAndLastIntermidateCity?: number
}

interface DistanceBtnIntermidiateCities {
    city1: City;
    city2: City;
    routeDistance:number
}


export const getDistance = async (origin: City |any, destination: City |any, intermidiateCities: City[]|any): Promise<DistanceResponse> => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          var isDijonPresent: Boolean = false;
          for (var i = 0; i < intermidiateCities?.length; i++) {
              if (intermidiateCities[i].name === "dijon") {
                  isDijonPresent = true;
                  break;
              }
          }
          if (isDijonPresent || origin?.name.toLowerCase() === "dijon" || destination?.name.toLowerCase() === "dijon") {
          reject(new Error('Failed to calculate distance'));
          } else {

              var distanceResponse: DistanceResponse = {};

             

              if (intermidiateCities.length === 0) {
                  finalDistance = calculateDistance(origin, destination);
                  distanceResponse.distanceBtnOriginAndDestination = finalDistance;
              }
              else {
                  //final distance
                  var finalDistance: number = 0;

                  //distance between the origin city and the first intermidiate city only
                  var firstDistance: number = calculateDistance(origin, intermidiateCities[0]);
                  distanceResponse.distanceBtnOriginAndFirtsIntermidateCity = firstDistance;
                  finalDistance += firstDistance;

                  if (intermidiateCities?.length !== 1) {
                  //distance between the intermidiate cities only
                  distanceResponse.distanceBtnIntermidiateCities = [];

                      for (var i: number = 0; i < intermidiateCities.length - 1; i++) {
                          var intermidiateCityRouteDistance: number = calculateDistance(intermidiateCities[i], intermidiateCities[i + 1]);
                          distanceResponse.distanceBtnIntermidiateCities.push(
                              {
                                  city1: intermidiateCities[i],
                                  city2: intermidiateCities[i + 1],
                                  routeDistance: intermidiateCityRouteDistance
                               }
                          )
                          finalDistance += intermidiateCityRouteDistance;
                      }
                  }

                  //distance between the last intermidiate city and the destination
                  var lastDistance: number = calculateDistance(destination, intermidiateCities[intermidiateCities.length - 1]);
                  finalDistance += lastDistance;
                  distanceResponse.distanceBtnDestinationAndLastIntermidateCity = lastDistance;

                  distanceResponse.distanceBtnOriginAndDestination = finalDistance;
                  resolve(distanceResponse);
              }
        }
      }, 1000);
    });
  };
  