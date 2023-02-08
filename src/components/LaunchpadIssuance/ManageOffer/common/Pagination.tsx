import React, { useCallback, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import { ITEM_ROWS } from '../../utils/constants'

interface Props {
  totalItems: number;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (page: number) => void;
}

export const Pagination = ({ totalItems, totalPages, setPage, page, pageSize, setPageSize }: Props) => {
  const theme = useTheme()
  const container = React.useRef<HTMLDivElement>(null)

  const [showDropdown, setShowDropdown] = useState(false)

  const paginationSizes = useMemo(() => ITEM_ROWS, [])

  const onChangePageSize = useCallback((size: number) => {
    setPageSize(size)
    setPage(1)
  }, [])

  const onChangePage = useCallback((pageNumber: number) => {
    scrollToTop()
    setPage(pageNumber)
    // todo reset selected when moving page
  }, [])

  const scrollToTop = React.useCallback(() => {
    //window.scrollTo({ top: 0, behavior: 'smooth' })
    const yOffset = document.documentElement.scrollTop || document.body.scrollTop;
    if (yOffset > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, yOffset - yOffset / 1.75);
    }
  }, [])

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
        <PageSizeLabel>{pageSize}</PageSizeLabel>

        <PageSizeIcon isOpen={showDropdown}>
          <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
        </PageSizeIcon>

        {showDropdown && (
          <PageSizeOptions>
            {paginationSizes.map((option, idx) => (
              <PageSizeOption key={idx} onClick={() => onChangePageSize(option.value)}>{option.label}</PageSizeOption>
            ))}
          </PageSizeOptions>
        )}
      </PageSizeDropdown>

      <PageCount>
        {((page - 1) * pageSize) + 1} - {page * pageSize < totalItems ? page * pageSize : totalItems} of {totalItems}
      </PageCount>

      <PageButton onClick={() => onChangePage(page - 1)} disabled={page <= 1}>
        <ChevronLeft />
      </PageButton>

      <PageButton onClick={() => onChangePage(page + 1)} disabled={page >= totalPages}>
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
    ${props => props.isOpen && 'transform: rotate(180deg);'};
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
