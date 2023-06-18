export const formatDates = (startDate: Date, endDate?: Date) => {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-GB', { hour: "2-digit", minute: '2-digit' })
  if (!endDate) {
    return formatDate(startDate)
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}
