import React from 'react'

interface Props {
  stroke?: string
}

export const EyeIcon = (props: Props) => {
  return (
    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 4.49254C3.14925 -0.164179 9.59701 -0.164179 11.7463 4.49254M6.37313 7C5.99312 7 5.62868 6.84904 5.35997 6.58033C5.09126 6.31162 4.9403 5.94718 4.9403 5.56716C4.9403 5.18715 5.09126 4.82271 5.35997 4.554C5.62868 4.28529 5.99312 4.13433 6.37313 4.13433C6.75315 4.13433 7.11759 4.28529 7.3863 4.554C7.65501 4.82271 7.80597 5.18715 7.80597 5.56716C7.80597 5.94718 7.65501 6.31162 7.3863 6.58033C7.11759 6.84904 6.75315 7 6.37313 7Z"
        stroke={props.stroke || '#6666FF'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
