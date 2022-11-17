import React from 'react'

interface Props {
  onTriggered: () => void
}

export const PaginationTrigger: React.FC<Props> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = React.useState(false)

  const observer = React.useMemo(() => new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting)), [])

  React.useEffect(() => {
    observer.observe(ref.current!)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  React.useEffect(() => {
    if (isVisible) {
      props.onTriggered()
    }
  }, [isVisible])

  return <div ref={ref} />
}