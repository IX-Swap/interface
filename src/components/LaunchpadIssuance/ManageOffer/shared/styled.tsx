import React from 'react'
import styled from 'styled-components'

export const HeaderLabel = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 48px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
`
export const ExtractButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export const ExtractText = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.primary};
  margin-left: 10px;
`
export const TableTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`