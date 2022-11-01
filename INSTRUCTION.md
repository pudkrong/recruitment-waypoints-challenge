# Waypoints Challenge

## Ideas
The given waypoints will be sorted by timestamp. The function will iterate through array and do calculation on duration and distance using `geolib` package to calculate the distance between 2 geo locations.

**Note**: The first waypoint will be ignored even the speed exceeds the limit.

## How to run
- Run `npm install`
- Run `npm run dev` to read the waypoints file and process the data. The result will return as json
  ```
  {
    distance: number,
    duration: number,
    totalDistance: number,
    totalDuration: number
  }
  ```
  - Distance: The total distance that a driver has driven at speed exceeding the speed limit in meters
  - Duration: The total duration that a driver has driven at speed exceeding the speed limit in milliseconds
  - Total Distance: The total driving distance in meters
  - Total Duration: The total driving time in milliseconds
- Run `npm test` to run test

