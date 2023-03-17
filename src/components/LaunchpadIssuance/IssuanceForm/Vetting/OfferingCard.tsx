import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as InfoIcon } from 'assets/launchpad/svg/info-icon.svg'
import { IconWrapper, MouseoverLightTooltip, MouseoverTooltip } from 'components/Tooltip'

interface OfferingProps {
    option: string,
    text: string,
    tooltipContent: string
}

export const OfferingCard = ({option, text, tooltipContent} : OfferingProps) => {
    const [selectedOption, setSelectedOption] = useState("");

    const iconStyles = {
        stroke: 'blue',
        strokeWidth: 1,
        transition: 'stroke 0.2s ease-out',
            ':hover': {
            stroke: 'red',
        },
    }

    return <Card className={selectedOption === option ? "selected" : ""} onClick={() => setSelectedOption(option)}>
        <DisplayFlexRow>
            <RadioButton name="primary-offer" type="radio" value={option}/>
            <MouseoverLightTooltip text={tooltipContent} placement={'top-start'} 
                style={{backgroundColor: "#fff", width: "300px", color: "#8D8DA3", 
                fontSize: "12px", fontWeight: 500, lineHeight: "150%", border: "1px solid #E6E6FF" }}>
                <IconWrapper size={20}>
                    <InfoIcon style={iconStyles}/>
                </IconWrapper>
            </MouseoverLightTooltip>
        </DisplayFlexRow>
        <OfferingText>{text}</OfferingText>
    </Card>
}



const OfferingText = styled.text`
    font-size: 14px;
    margin-top: 20px;
    margin-left: 6px;
    line-height: 160%;
    font-weight: 500;
    color: ${props => props.theme.launchpad.colors.text.hint};
`

const DisplayFlexRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const Card = styled.p`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: flex-start;
    justify-items: start;
    padding: 20px;
    height: 151px;
    color: #000;
    border: 1px solid;
    border-color: ${props => props.theme.launchpad.colors.border.default};
    border-radius: 10px;
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
    transition: background 0.2s ease-out, border-color 0.2s ease-out;

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