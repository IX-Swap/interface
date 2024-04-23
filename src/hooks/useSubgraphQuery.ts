import { useEffect, useState } from 'react'
import { SUBGRAPH_URLS } from 'constants/subgraph'

interface SubgraphQueryProps {
  feature: string
  chainId: number | undefined
  query: string
  autoPolling?: boolean
  pollingInterval?: number
}

export const useSubgraphQuery = ({
  feature,
  chainId,
  query,
  autoPolling = false,
  pollingInterval = 3000,
}: SubgraphQueryProps) => {
  if (!chainId) {
    return null
  }

  const [data, setData] = useState<{ [key: string]: any }>({})

  const fetchData = async () => {
    try {
      const endpoint = SUBGRAPH_URLS[feature][chainId]

      if (!endpoint || !query) return

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: null }),
      })

      const responseData = await resp.json()
      setData(responseData.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()

    if (autoPolling) {
      // Polling logic
      const interval = setInterval(fetchData, pollingInterval)

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, pollingInterval, autoPolling, query])

  return data
}
