
import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as InfoSvg } from 'assets/launchpad/svg/info-icon.svg'
import { IconWrapper, MouseoverVettingTooltip } from 'components/Tooltip'

interface OfferingProps {
    name: string,
    id: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    option: string,
    text: string,
    tooltipContent: string,
    checked: boolean,
    disabled: boolean,
}

export const OfferingCard = ({ name, id, onChange, option, text, tooltipContent, checked, disabled }: OfferingProps) => {
    const theme = useTheme()
    return <Card htmlFor={option} checked={checked}>
        <DisplayFlexRow>
            <RadioButton name={name} id={id} type="radio" value={option} disabled={disabled} onChange={onChange} checked={checked} />
            <MouseoverVettingTooltip text={tooltipContent} placement={'top-start'}
                style={{
                    backgroundColor: `${theme.white}`, color: `${theme.launchpad.colors.text.hint}`,
                    border: `1px solid ${theme.launchpad.colors.border.default}`
                }}>
                <IconWrapper size={20} strokeColor={theme.launchpad.colors.primary}>
                    <InfoSvg />
                </IconWrapper>
            </MouseoverVettingTooltip>

        </DisplayFlexRow>
        <OfferingText checked={checked}>{text}</OfferingText>
    </Card>
}


const OfferingText = styled.text<{ checked: boolean }>`
    font-size: 14px;
    margin-top: 20px;
    margin-left: 6px;
    line-height: 160%;
    font-weight: 500;
    color: ${({ theme, checked }) => checked ? theme.launchpad.colors.text.title : theme.launchpad.colors.text.hint};
`

const DisplayFlexRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const Card = styled.label<{ htmlFor: string, checked: boolean }>`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: flex-start;
    justify-items: start;
    padding: 20px;
    height: 151px;
    color: #000;
    border: 1px solid;
    border-color: ${({ theme, checked }) => checked ? theme.launchpad.colors.primary : theme.launchpad.colors.border.default};
    border-radius: 10px;
    cursor: pointer;
`

const RadioButton = styled.input`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    background: #fff;
    border: 1px solid ${props => props.theme.launchpad.colors.border.default};
    height: 16px;
    width: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:checked::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        background-color: #fff;
        border: 6px solid;
        border-radius: 50%;
        border-color: ${props => props.theme.launchpad.colors.primary};
    }

    &:checked {
        background-color: #fff;
        border: none;
    }

`