export function shortenEmail(email: string | null): string {
  if (!email) return ''
  const [username, domain] = email.split('@')
  return username.slice(0, 5) + '...@' + domain
}
