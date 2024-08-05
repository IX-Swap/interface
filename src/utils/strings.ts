export function shortenEmail(email: string | null): string {
  if (!email) return ''
  const [username, domain] = email.split('@')
  return username.slice(0, 5) + '...@' + domain
}

export function capitalizeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
