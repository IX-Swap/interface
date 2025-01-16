import React, { useRef } from 'react'
import styled from 'styled-components'

import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ChevronElement } from 'components/ChevronElement'
import { MEDIA_WIDTHS } from 'theme'
import { ReactComponent as Checked } from 'assets/images/checked-blue.svg'
import { VioletCard } from '../Card'
import { LOCALES, useLocalization } from 'i18n'

export const LocaleDropdown = () => {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.LOCALE_SELECTOR)
  const toggle = useToggleModal(ApplicationModal.LOCALE_SELECTOR)
  useOnClickOutside(node, open ? toggle : undefined)

  const { language, switchLanguage } = useLocalization()
  const currentLanguage = LOCALES.find((locale) => locale.code === language) || null

  const handleRowClick = (targetLocale: string) => {
    toggle()
    if (language !== targetLocale) {
      console.log('language', language)
      console.log('targetLocale', targetLocale)
      switchLanguage(targetLocale)
    }
  }

  return (
    <StyledBox>
      <Selector ref={node as any}>
        <SelectorControls onClick={() => toggle()}>
          <Wrapper style={{ color: '#292933', marginRight: '10px' }}>{currentLanguage?.shortName}</Wrapper>

          <ChevronElement showMore={open} setShowMore={toggle} />
        </SelectorControls>

        {open && (
          <FlyoutMenu>
            {LOCALES.map((locale: any) => {
              const active = language === locale.code
              const targetLocale = locale.code
              return (
                <FlyoutRow key={targetLocale} onClick={() => handleRowClick(targetLocale)} active={active}>
                  <Label>
                    {locale.fullName} ({locale.shortName})
                  </Label>
                  {language === targetLocale && <Checked />}
                </FlyoutRow>
              )
            })}
          </FlyoutMenu>
        )}
      </Selector>
    </StyledBox>
  )
}

const SelectorControls = styled(VioletCard)`
  cursor: pointer;
  padding: 2px 3px;
  background: transparent;
  width: max-content;
  display: flex;
  justify-content: space-between;
  button {
    ${({ theme }) => theme.mediaWidth.upToSmall`
     padding: 0 3px 0 1px;
  `};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    text-overflow: ellipsis;
    flex-shrink: 1;
    padding: 0;
  `};
`

const Wrapper = styled.div`
  font-size: 13px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     padding: 4.6px 0;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
     font-size: 12px;
  `};
`

const FlyoutMenu = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  overflow: auto;
  padding: 6px 24px;
  position: absolute;
  top: 70px;
  width: 210px;
  z-index: 99;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 54px;
    right: 0;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    left: 70px;
    right: 0;
  }
  @media screen and (max-width: 400px) {
    left: 30px;
    right: 0;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 18px 0;
  text-align: left;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #e6e6ff;
  }
`

const Label = styled.div`
  flex: 1 1 auto;
`

const Selector = styled.div`
  margin-right: 5px;
`
const StyledBox = styled.div`
  font-size: 12px;
  border: 1px solid #e6e6ff;
  padding: 10px 5px 10px 10px;
  border-radius: 4px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
     padding: 10px 20px 10px 20px;
  `};
  :active {
    border: 1px solid #4d8fea;
  }
  :hover {
    transition: 0.2s;
    border: 1px solid #4d8fea;
  }
  position: relative;
`
