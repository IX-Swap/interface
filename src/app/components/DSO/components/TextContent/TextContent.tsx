import { Box, Button, Typography } from '@mui/material'
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
            <Box
              sx={{
                width: '100%',
                height: 80,
                marginTop: -10,
                zIndex: 100,
                position: 'relative',
                pointerEvents: 'none',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)'
              }}
            />
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
