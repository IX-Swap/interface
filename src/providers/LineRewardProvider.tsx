import React, { createContext, PropsWithChildren, useContext } from 'react'
import _useLineReward from 'hooks/useLineReward'

export type UseLineRewardResult = ReturnType<typeof _useLineReward>
export const LineRewardContext = createContext<UseLineRewardResult | null>(null)

export function LineRewardProvider({ children }: PropsWithChildren) {
  const value = _useLineReward()
  return <LineRewardContext.Provider value={value}>{children}</LineRewardContext.Provider>
}

export const useLineReward = (): UseLineRewardResult => useContext(LineRewardContext) as UseLineRewardResult
