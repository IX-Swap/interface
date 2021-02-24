import { useFormContext } from 'react-hook-form'

export const useTaxResidencies = (index?: number) => {
  const { watch, getValues } = useFormContext()
  const singaporeOnly: boolean = watch('singaporeOnly', 'yes') === 'yes'
  const taxAvailable: boolean = watch(`taxResidencies[${index}].taxIdAvailable`)

  return {
    singaporeOnly,
    taxAvailable
  }
}
