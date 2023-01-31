import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import { Issuance } from 'state/launchpad/types'
import styled, { useTheme } from 'styled-components'
import { ITEM_ROWS } from '../utils/constants'

interface Props {
  items: Issuance[]

  totalItems: number
  totalPages: number

  currentPage: number
  pageSize: number

  onChangePage: (page: number) => void
  onChangePageSize: (size: number) => void
}

export const IssuancePagination: React.FC<Props> = (props) => {
  const theme = useTheme()

  const container = React.useRef<HTMLDivElement>(null)
  
  const [showDropdown, setShowDropdown] = React.useState(false)
  
  const paginationSizes = React.useMemo(() => ITEM_ROWS, [])
  const pageCountLabel = React.useMemo(() => {
    const start = ((props.currentPage - 1) * props.pageSize) + 1
    const end = props.currentPage * props.pageSize < props.totalItems 
      ? props.currentPage * props.pageSize 
      : props.totalItems

    return `${start} - ${end} of ${props.totalItems}`
  }, [props.currentPage, props.pageSize, props.totalItems])
  
  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showDropdown, container])

  return (
    <PaginationRow>
      <PageSizeDropdown ref={container} onClick={() => setShowDropdown(state => !state)}>
        <PageSizeLabel>{props.pageSize}</PageSizeLabel>
        
        <PageSizeIcon isOpen={showDropdown}>
          <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
        </PageSizeIcon>
        
        {showDropdown && (
          <PageSizeOptions>
            {paginationSizes.map((option, idx) => (
              <PageSizeOption key={idx} onClick={() => props.onChangePageSize(option.value)}>{option.label}</PageSizeOption>
            ))}
          </PageSizeOptions>
        )}
      </PageSizeDropdown>

      <PageCount>{pageCountLabel}</PageCount>

      <PageButton onClick={() => props.onChangePage(props.currentPage - 1)} disabled={props.currentPage <= 1}>
        <ChevronLeft />
      </PageButton>
      
      <PageButton onClick={() => props.onChangePage(props.currentPage + 1)} disabled={props.currentPage >= props.totalPages}>
        <ChevronRight />
      </PageButton>
    </PaginationRow>
  )
}

const PaginationRow = styled.div`
  display: flex;

  flex-flow: row nowrap;

  justify-content: flex-end;
  align-items: center;

  gap: 0.5rem;

  height: 40px;
  max-width: 1180px;

  margin: 1rem auto;
`

const PageCount = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 48px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const PageButton = styled.button`
  display: grid;

  place-content: center;

  width: 30px;
  height: 30px;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 27px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  ${props => props.disabled && `
    background: ${props.theme.launchpad.colors.disabled};
  `}

  ${props => !props.disabled && `
    cursor: pointer;

    transition: all 0.3s;

    :hover {
      background: ${props.theme.launchpad.colors.foreground};
      transform: scale(1.1);
    }
  `}
`

const PageSizeDropdown = styled.div`
  position: relative;

  display: flex;

  flex-flow: row nowrap;

  gap: 0.25rem;
  padding: 0.5rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const PageSizeIcon = styled.div<{ isOpen: boolean }>`
  grid-area: icon;

  display: grid;
  place-content: center;

  > svg {
    transition: transofrm 0.4s;
    ${props => props.isOpen && 'transform: rotate(180deg);' };
  }
`

const PageSizeOptions = styled.div`
  position: absolute;

  bottom: -0.5rem;
  left: 0;
  right: 0;

  transform: translate(0, 100%);

  z-index: 30;

  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  max-height: 300px;
  overflow-y: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeOption = styled.div`
  padding: 0.5rem 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  cursor: pointer;

  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`
