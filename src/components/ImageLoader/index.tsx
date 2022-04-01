import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import LoadingThin from 'assets/images/loader.gif'

interface Props {
  alt?: string
  height?: number | string
  src: string
  width?: number | string
  className?: string
  [key: string]: any
}

export const ImageLoader = ({ className, ...props }: Props) => {
  return <LazyLoadImage wrapperClassName={className} {...props} placeholderSrc={LoadingThin} />
}
