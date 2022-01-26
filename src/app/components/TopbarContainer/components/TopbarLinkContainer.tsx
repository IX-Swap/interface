import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { HeaderNavigationLink } from 'app/components/TopbarContainer/components/HeaderNavigationLink'
import { blue } from '@mui/material/colors'

export interface TopbarLinkProps {
  link: string
  label: string
  disabled?: boolean
  colorVariant?: 'nav' | 'menu'
}

export const TopbarLinkContainer = (props: TopbarLinkProps) => {
  const { link, label, disabled = false, colorVariant = 'nav' } = props
  const { pathname } = useLocation()

  const baseLink = link.split('/').slice(0, 3).join('/')
  const isActive = pathname.startsWith(baseLink)

  const { theme } = useAppBreakpoints()
  const navColor = isActive
    ? blue[300]
    : theme.palette.mode === 'dark'
    ? theme.palette.getContrastText(theme.palette.background.default)
    : theme.palette.background.default
  const menuColor = isActive
    ? theme.palette.background.default
    : theme.palette.slider.activeBackground

  return (
    <HeaderNavigationLink
      to={link}
      style={{
        color: colorVariant === 'menu' ? menuColor : navColor
      }}
      onClick={e => (disabled ? e.preventDefault() : null)}
    >
      <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
      {disabled ? (
        <svg
          width='7'
          height='4'
          viewBox='0 0 7 4'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.5 4L0.468911 0.25L6.53109 0.25L3.5 4Z'
            fill={
              colorVariant === 'nav' && isActive
                ? blue[300]
                : theme.palette.mode === 'dark'
                ? theme.palette.getContrastText(
                    theme.palette.background.default
                  )
                : theme.palette.background.default
            }
          />
        </svg>
      ) : null}
    </HeaderNavigationLink>
  )
}
