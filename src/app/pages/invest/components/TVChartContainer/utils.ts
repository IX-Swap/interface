import { LanguageCode } from 'charting-library/charting_library'

export function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode)
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
