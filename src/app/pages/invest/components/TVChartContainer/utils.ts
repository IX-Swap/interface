import { LanguageCode } from 'charting_library'

export function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
}

export const getMovingAverageParams = (periods: number, color: string) => {
  return [
    'Moving Average Exponential',
    false,
    false,
    [periods],
    {
      'plot.color': color
    }
  ]
}
export const periodLengthSeconds = (
  resolution: string,
  requiredPeriodsCount: number
): number => {
  let daysCount = 0

  if (resolution === 'D' || resolution === '1D') {
    daysCount = requiredPeriodsCount
  } else if (resolution === 'M' || resolution === '1M') {
    daysCount = 31 * requiredPeriodsCount
  } else if (resolution === 'W' || resolution === '1W') {
    daysCount = 7 * requiredPeriodsCount
  } else {
    daysCount = (requiredPeriodsCount * parseInt(resolution)) / (24 * 60)
  }

  return daysCount * 24 * 60 * 60
}
