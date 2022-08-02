import { Box, Button, Typography } from '@mui/material'
import { useStyles } from 'app/components/DSO/components/TextContent/TextContent.styles'
import React, { useEffect, useRef, useState } from 'react'

export interface TextContentProps {
  content: JSX.Element
  title?: string
}

export const TextContent = ({ content, title }: TextContentProps) => {
  const max = 180
  const [maxHeight, setMaxHeight] = useState<number | string>(max)
  const [scrollHeight, setScrollHeight] = useState<number | undefined>()
  const contentRef = useRef<HTMLDivElement>(null)
  const { overlay } = useStyles()

  useEffect(() => {
    setScrollHeight(contentRef?.current?.scrollHeight)
  }, [contentRef])

  const setMaxToAuto = () => {
    setMaxHeight('auto')
  }

  return (
    <Box>
      {title !== undefined && (
        <Typography variant='h5' sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}

      <Box ref={contentRef} maxHeight={maxHeight} overflow='hidden'>
        {content}
      </Box>
      {maxHeight !== 'auto' &&
        scrollHeight !== undefined &&
        scrollHeight > max && (
          <Box width='100%' pt={2}>
            <Box className={overlay} />
            <Button
              variant='contained'
              fullWidth
              onClick={setMaxToAuto}
              disableElevation
            >
              Read More
            </Button>
          </Box>
        )}
    </Box>
  )
}
