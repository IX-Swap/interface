import { useFormContext } from 'react-hook-form'

export const useTaxResidencies = (index?: number) => {
  const { watch } = useFormContext()
  const singaporeOnly: boolean = watch('singaporeOnly', 'no') === 'yes'
  const taxAvailable: boolean = watch(
    `taxResidencies[${index ?? 0}].taxIdAvailable`,
    false
  )

  return {
    singaporeOnly,
    taxAvailable
  }
}
