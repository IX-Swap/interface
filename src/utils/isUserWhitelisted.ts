import { whitelistedUsers } from 'constants/whitelisted-users'

interface Props {
  account?: null | string
  chainId?: number
}

export const isUserWhitelisted = ({ account = '', chainId = 0 }: Props) => {
  const isProd = ['test production env', 'production'].includes(process.env.NODE_ENV)

  if (!isProd || !account) return true

  const whitelisted = whitelistedUsers[chainId] || []

  if (whitelisted.length === 0) return true

  return whitelisted.includes(account)
}
