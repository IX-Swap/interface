import moment from "moment"

export const formatDates = (startDate: Date, endDate?: Date) => {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-GB')
  if (!endDate) {
    return formatDate(startDate)
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

export const formatDateRange = (from: Date, to?: Date) =>
  moment(from).format('Do MMM, HH:mm') + (to ? ` - ${moment(to).format('Do MMM, HH:mm')}` : '')