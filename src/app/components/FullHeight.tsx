import { Ref, useLayoutEffect, useRef, useState } from 'react'
import { Maybe } from 'types/util'
import { debounce } from '@mui/material/utils'

export interface FullHeightProps {
  children: (height: number, ref: Ref<any>) => Maybe<JSX.Element>
}

export const CONTAINER_VERTICAL_PADDING = 40

export const FullHeight = ({ children }: FullHeightProps) => {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const setRefElementMaxHeight = debounce(() => {
    if (ref.current !== undefined && ref.current !== null) {
      setHeight(
        window.innerHeight -
          (ref.current.offsetTop + CONTAINER_VERTICAL_PADDING)
      )
    }
  }, 150)

  useLayoutEffect(() => {
    setRefElementMaxHeight()

    window.addEventListener('resize', setRefElementMaxHeight, false)

    return () => {
      window.removeEventListener('resize', setRefElementMaxHeight)
    }
  }, []) //eslint-disable-line

  return children(height, ref)
}
