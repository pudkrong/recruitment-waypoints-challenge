import { analyze } from './analyze'

describe('analyze', () => {
  it('should return initial data for empty array', () => {
    expect(analyze([])).toEqual({
      distance: 0,
      duration: 0,
      totalDistance: 0,
      totalDuration: 0,
    })
  })

  it('should return initial data for 1 element array', () => {
    const data = [
      {
        timestamp: new Date(),
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
    ]
    expect(analyze(data)).toEqual({
      distance: 0,
      duration: 0,
      totalDistance: 0,
      totalDuration: 0,
    })
  })

  it('should calculate only total duration and distance when no exceeding speed limit', () => {
    const data = [
      {
        timestamp: new Date('2016-06-21T12:00:00.000Z'),
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
      {
        timestamp: new Date('2016-06-21T12:00:15.000Z'),
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 8.32,
        speed_limit: 8.33,
      },
    ]
    expect(analyze(data)).toEqual({
      distance: 0,
      duration: 0,
      totalDistance: 145,
      totalDuration: 15000,
    })
  })

  it('should not calculate when speed equals speed limit', () => {
    const data = [
      {
        timestamp: new Date('2016-06-21T12:00:00.000Z'),
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
      {
        timestamp: new Date('2016-06-21T12:00:15.000Z'),
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 8.33,
        speed_limit: 8.33,
      },
    ]
    expect(analyze(data)).toEqual({
      distance: 0,
      duration: 0,
      totalDistance: 145,
      totalDuration: 15000,
    })
  })

  it('should calculate when speed exceeds speed limit', () => {
    const data = [
      {
        timestamp: new Date('2016-06-21T12:00:00.000Z'),
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
      {
        timestamp: new Date('2016-06-21T12:00:15.000Z'),
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 8.35,
        speed_limit: 8.33,
      },
    ]
    expect(analyze(data)).toEqual({
      distance: 145,
      duration: 15000,
      totalDistance: 145,
      totalDuration: 15000,
    })
  })

  it('should not calculate when speed exceeds speed limit in the first element', () => {
    const data = [
      {
        timestamp: new Date('2016-06-21T12:00:00.000Z'),
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 9,
        speed_limit: 8.33,
      },
      {
        timestamp: new Date('2016-06-21T12:00:15.000Z'),
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 7.0,
        speed_limit: 8.33,
      },
    ]
    expect(analyze(data)).toEqual({
      distance: 0,
      duration: 0,
      totalDistance: 145,
      totalDuration: 15000,
    })
  })
})
