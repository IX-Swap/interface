import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useMyInfoAuthorize = () => {
  const { apiService } = useServices()
  const { getFilterValue } = useQueryFilter()
  const code = getFilterValue('code')
  localStorage.setItem('code', code ? code : '')
  console.log(code, 'code')
  const authorize = async () => {
    return await apiService.post('sing-pass/authorize', {
      code: code ? code : localStorage.getItem(code ? code : '')
    })
  }

  const { data, ...rest } = useQuery('sing-pass-authorize', authorize, {
    enabled: code !== undefined && code !== '',
    retry: false
  })

  return {
    ...rest,
    data: data?.data
  }
}
