import { useEffect, useMemo, useState } from 'react'
import { QueryConfig, useQuery } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import {
  convertBlobToFile,
  createObjectURLFromFile,
  revokeObjectURL
} from 'v2/hooks/utils'
import { AxiosResponse } from 'axios'

export const useRawDataroomFile = (
  uri: string,
  queryConfig?: QueryConfig<AxiosResponse<Blob>>
) => {
  const { apiService } = useServices()
  const queryFn = async () => {
    return await apiService.get<Blob>(uri, { responseType: 'blob' })
  }
  const { data, ...rest } = useQuery(uri, queryFn, queryConfig)
  const blob = useMemo(() => data?.data ?? new Blob(), [data])
  const [file, setFile] = useState<string>('')

  useEffect(() => {
    if (data !== undefined) {
      setFile(createObjectURLFromFile(convertBlobToFile(blob, '')))
    }

    return () => {
      revokeObjectURL(file)
    }
  }, [blob]) // eslint-disable-line

  return {
    ...rest,
    data: file
  }
}
