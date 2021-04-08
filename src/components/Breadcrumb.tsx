import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { memo, useEffect } from 'react'

export interface BreadcrumbProps {
  path: string
  label: string
}

export const Breadcrumb = memo((props: BreadcrumbProps) => {
  const { push, remove } = useBreadcrumbs()

  useEffect(() => {
    push(props)

    return () => {
      remove(props)
    }
  }, [props]) // eslint-disable-line

  return null
})
