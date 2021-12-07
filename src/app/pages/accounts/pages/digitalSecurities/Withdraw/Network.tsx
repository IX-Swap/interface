import { useTokenInfo } from 'app/pages/accounts/hooks/useTokenInfo'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Network = () => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('token')

  const { data } = useTokenInfo(tokenSymbol)

  return <LabelledValue label='Network' value={data?.network.name} />
}
