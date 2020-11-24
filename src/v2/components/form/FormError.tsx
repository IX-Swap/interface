import { useFormError } from 'v2/hooks/useFormError'
import { FieldError } from 'react-hook-form'
import { Maybe } from 'v2/types/util'

export interface FormErrorRendererProps {
  error: FieldError
}

export interface FormErrorProps {
  name: string
  render: (props: FormErrorRendererProps) => Maybe<JSX.Element>
}

export const FormError = (props: FormErrorProps) => {
  const { name, render } = props
  const { hasError, error } = useFormError(name)

  if (!hasError) {
    return null
  }

  return render({ error })
}
