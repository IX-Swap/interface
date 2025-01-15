import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'
import { linePoint } from 'services/apiUrls'
import { Address } from 'viem'
import { API_KEY, LineRewardAction } from 'constants/lineRewards'

export const apiService = axios.create({
  baseURL: linePoint.baseUrl,
  headers: {
    Authorization: API_KEY,
  },
})

function useLineReward() {
  const [openTaskSuccessModal, setOpenTaskSuccessModal] = useState(false)
  const [rewardsData, setRewardsData] = useState<{
    points?: number
    action?: LineRewardAction
  }>({
    points: 0,
    action: undefined,
  })

  const mutatePoint = useMutation({
    mutationFn: async ({ account, points, action }: { account: Address; points: number; action: LineRewardAction }) => {
      return apiService.post(
        linePoint.addPoint,
        {
          walletAddress: account,
          points,
          action,
        },
        {}
      )
    },
  })

  return {
    mutatePoint,
    openTaskSuccessModal,
    setOpenTaskSuccessModal,
    rewardsData,
    setRewardsData,
  }
}

export default useLineReward
