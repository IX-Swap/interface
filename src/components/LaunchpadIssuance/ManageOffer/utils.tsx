export const formatDates = (startDate: Date, endDate?: Date) => {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-GB', {});
  if (!endDate) {
    return formatDate(startDate);
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}