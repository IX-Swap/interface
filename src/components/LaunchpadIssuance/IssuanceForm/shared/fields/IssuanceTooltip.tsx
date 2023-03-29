import React from 'react'
import { MouseoverVettingTooltip } from "components/Tooltip"
import { Info } from "react-feather"
import styled, { useTheme } from "styled-components"

interface IssuanceTooltipProps {
    tooltipContent: string
}

export const IssuanceTooltip = ({tooltipContent} : IssuanceTooltipProps) => {
    const theme = useTheme()

    return <MouseoverVettingTooltip text={tooltipContent} placement={'top-start'}
        style={{
            backgroundColor: `${theme.white}`, color: `${theme.launchpad.colors.text.hint}`,
            border: `1px solid ${theme.launchpad.colors.border.default}`
        }}>
        <InfoIcon />
    </MouseoverVettingTooltip>
}

const InfoIcon = styled(Info)`
    height: 15px;
    width: 15px;
    stroke: 1.5;
    color: ${props => props.theme.launchpad.colors.text.caption};
    &:hover {
        color: ${props => props.theme.launchpad.colors.primary};
    }
`