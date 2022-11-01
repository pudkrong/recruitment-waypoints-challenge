import { getDistance } from 'geolib'

interface WayPoint {
  timestamp: Date
  position: {
    latitude: number
    longitude: number
  }
  speed: number
  speed_limit: number
}

interface DriveInfo {
  distance: number
  duration: number
  totalDistance: number
  totalDuration: number
}

/**
 * Analyze will calculate distance and duration when exceeding speed limit and total distance and duration for the given waypoints
 * @param data WayPoint[]
 * @returns {
 *   distance: number,          // meter unit
 *   duration: number,          // milliseconds
 *   totalDistance: number,     // total distance in meter unit
 *   totalDuration: number      // total duration in milliseconds
 * }
 */
function analyze(data: WayPoint[]): DriveInfo {
  const driveInfo: DriveInfo = {
    distance: 0,
    duration: 0,
    totalDistance: 0,
    totalDuration: 0,
  }

  const sortedData = data.sort((a, b) => {
    return a.timestamp.getTime() - b.timestamp.getTime()
  })
  let prevPoint: WayPoint

  return sortedData.reduce<DriveInfo>((acc, currPoint, index) => {
    if (prevPoint) {
      const distance = getDistance(currPoint.position, prevPoint.position)
      const duration =
        currPoint.timestamp.getTime() - prevPoint.timestamp.getTime()

      acc.totalDistance += distance
      acc.totalDuration += duration

      // Exceed speed limit
      if (currPoint.speed > currPoint.speed_limit) {
        acc.distance += distance
        acc.duration += duration
      }
    }

    prevPoint = currPoint
    return acc
  }, driveInfo)
}

export { analyze }
