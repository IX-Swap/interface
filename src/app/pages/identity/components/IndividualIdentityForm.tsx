import { IndividualIdentity } from 'types/identity'
export interface IndividualIdentityFormProps {
  data: IndividualIdentity | undefined
  isNew?: boolean
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const IndividualIdentityForm = (props: IndividualIdentityFormProps) => {
  console.log(props)

  return null
}
