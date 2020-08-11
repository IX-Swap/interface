import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const Route = () => {
  const match = useRouteMatch()
  return <span>{match.path}</span>
}

export default Route
