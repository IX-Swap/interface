import { useFormContext } from 'react-hook-form'

export const useTaxResidencies = (index?: number) => {
  const { watch } = useFormContext()
  const singaporeOnly = watch('singaporeOnly')
  const taxAvailable: boolean = watch(
    `taxResidencies[${index ?? 0}].taxIdAvailable`,
    false
  )

  return {
    singaporeOnly:
      singaporeOnly === undefined ? undefined : singaporeOnly === 'yes',
    taxAvailable
  }
}
