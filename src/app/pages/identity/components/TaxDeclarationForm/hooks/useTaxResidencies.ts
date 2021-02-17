import { useFormContext } from 'react-hook-form'

export const useTaxResidencies = (index?: number) => {
  const { watch } = useFormContext()
  const singaporeOnly: boolean = watch('singaporeOnly', 'yes') === 'yes'
  const taxAvailable: boolean = watch('taxIdAvailable', true)

  return {
    singaporeOnly,
    taxAvailable
  }
}
