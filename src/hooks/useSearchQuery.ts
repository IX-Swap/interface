import { useLocation } from 'react-router-dom'

export const useSearchQuery = () => {
  const { search } = useLocation()
  const searchQuery = new URLSearchParams(search)

  return searchQuery
}
