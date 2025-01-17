import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { linePoint } from 'services/apiUrls'
import { Address } from 'viem'
import { API_KEY, JOIN_CAMPAIGN_REWARD, LINE_REWARD_KEY, LineRewardAction } from 'constants/lineRewards'
import { useWeb3React } from './useWeb3React'
import { isLineLiff } from 'utils'
import { apiService as lineRewardApiService } from 'hooks/useLineReward'

export const apiService = axios.create({
  baseURL: linePoint.baseUrl,
  headers: {
    Authorization: API_KEY,
  },
})

function useLineReward() {
  const { account } = useWeb3React()
  const [openTaskSuccessModal, setOpenTaskSuccessModal] = useState(false)
  const [rewardsData, setRewardsData] = useState<{
    points: number
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

  // Claim rewards for joining campaign
  const lineRewardLocal = JSON.parse(
    localStorage.getItem(LINE_REWARD_KEY) || '{}'
  )
  const hasJoinedLiffCampaigned = Boolean(lineRewardLocal.hasJoinedLiffCampaigned)
  const setLineRewardLocalStorage = (key: string, value: any) => {
    lineRewardLocal[key] = value
    localStorage.setItem(LINE_REWARD_KEY, JSON.stringify(lineRewardLocal))
  }

  useEffect(() => {
    if (hasJoinedLiffCampaigned)
      return

    setOpenTaskSuccessModal(true)
    setRewardsData({
      action: LineRewardAction.JOIN_CAMPAIGN,
      points: JOIN_CAMPAIGN_REWARD,
    })
    setLineRewardLocalStorage('hasJoinedLiffCampaigned', true)
  }, [hasJoinedLiffCampaigned])

  return {
    mutatePoint,
    openTaskSuccessModal,
    setOpenTaskSuccessModal,
    rewardsData,
    setRewardsData,
  }
}

export default useLineReward
