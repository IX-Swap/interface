import { IndividualIdentity } from 'app/pages/_identity/types/forms'

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
