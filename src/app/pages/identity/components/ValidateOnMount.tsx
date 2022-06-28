import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export const ValidateOnMount = () => {
  const { trigger } = useFormContext()

  useEffect(() => {
    void trigger()
  }, [trigger])

  return <></>
}
