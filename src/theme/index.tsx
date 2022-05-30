import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Colors } from './styled'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtremelySmall: 370,
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#EDCEFF' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    text6: darkMode ? '#8275BC' : '#8275BC',
    text7: darkMode ? '#9184C4' : '#9184C4',
    text8: darkMode ? '#9184C3' : '#9184C3',
    text9: darkMode ? '#EDCEFF80' : '#EDCEFF80', // rgba(237, 206, 255, 0.5)
    // backgrounds / greys
    bg0: darkMode ? '#0D0415' : '#FFF',
    bg1: darkMode ? '#1A123A' : '#F7F8FA',
    bg2: darkMode ? '#2C2F36' : '#EDEEF2',
    bg3: darkMode ? '#40444F' : '#CED0D9',
    bg4: darkMode ? '#565A69' : '#888D9B',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#1A2028' : '#6C7284',
    bg7: darkMode ? '#372E5E' : '#372E5E',
    bg8: darkMode ? '#0F0518' : '#0F0518',
    bg9: darkMode ? '#372E5D' : '#372E5D',
    bg10: darkMode ? '#EDCEFF' : '#EDCEFF',
    bg11: darkMode ? '#272046' : '#272046',
    bg12: darkMode ? '#271F4A' : '#271F4A',
    bg13: darkMode ? '#2F254E' : '#2F254E',
    bg14: darkMode ? '#ED0376' : '#ED0376',
    bg15: darkMode ? '#2C254A' : '#2C254A',
    bg16: darkMode ? '#170626' : '#170626',
    bg17: darkMode ? '#1C112D' : '#1C112D',
    bg18: darkMode ? '#27204666' : '#27204666', // rgba(39, 32, 70, 0.4)
    bg19: darkMode ? '#271F4A66' : '#271F4A66',
    bg20: darkMode ? '#7B42A9' : '#7B42A9',
    bg21: darkMode ? '#EDCEFF80' : '#EDCEFF80',
    bgG1: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), #2C254A;'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), #2C254A;',
    bgG2: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%,rgba(206,20,132,0.1) 0%,rgba(26,18,58,0.4) 100%),rgb(44,37,74,0.6);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%,rgba(206,20,132,0.1) 0%,rgba(26,18,58,0.4) 100%),rgb(44,37,74,0.6);',
    bgG3: darkMode
      ? 'linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%), #0C469C;'
      : 'linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%), #0C469C;',
    bgG4: darkMode
      ? 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%), #0F0518;'
      : 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%), #0F0518;',
    bgG5: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);',
    bgG6: darkMode
      ? 'linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);'
      : 'linear-gradient(0deg, #ED0376, #ED0376), linear-gradient(116.36deg, #7B42A9 33.43%, #ED0376 95.41%);',
    bgG7: darkMode
      ? 'linear-gradient(0deg, #272046, #272046), #170E20;'
      : 'linear-gradient(0deg, #272046, #272046), #170E20;',
    bgG8: darkMode
      ? 'linear-gradient(0deg, #1A123A, #1A123A), #170E20;'
      : 'linear-gradient(0deg, #1A123A, #1A123A), #170E20;',
    bgG9: darkMode
      ? 'linear-gradient(0deg, #14051B 0%, rgba(20, 5, 27, 0) 82.89%);'
      : 'linear-gradient(0deg, #14051B 0%, rgba(20, 5, 27, 0) 82.89%);',
    bgG10: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.231) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.1);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.231) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.1);',
    bgG11: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);',
    bgG12: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)',
    bgG13: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);',
    bgG14: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5);',
    bgG15: darkMode
      ? 'radial-gradient(76.91% 60% at 2.38% 3.84%, rgba(123, 66, 169, 0.195) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(79.76% 116.06% at 44.22% 136.36%, rgba(102, 20, 206, 0.132) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.132) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)'
      : 'radial-gradient(76.91% 60% at 2.38% 3.84%, rgba(123, 66, 169, 0.195) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(79.76% 116.06% at 44.22% 136.36%, rgba(102, 20, 206, 0.132) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.132) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)',
    bgG16: darkMode
      ? 'linear-gradient(0deg, rgba(13, 4, 21, 0.7), rgba(13, 4, 21, 0.7)), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);'
      : 'linear-gradient(0deg, rgba(13, 4, 21, 0.7), rgba(13, 4, 21, 0.7)), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.2);',
    bgG17: darkMode
      ? 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.028) 0%, rgba(237, 3, 118, 0.014) 100%), rgba(15, 5, 24, 0.7);'
      : 'radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.028) 0%, rgba(237, 3, 118, 0.014) 100%), rgba(15, 5, 24, 0.7);',
    bgG18: darkMode
      ? 'radial-gradient(83.59% 55.66% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(50.28% 108.33% at 73.7% 9%, rgba(102, 20, 206, 0.165) 1.94%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);'
      : 'radial-gradient(83.59% 55.66% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(50.28% 108.33% at 73.7% 9%, rgba(102, 20, 206, 0.165) 1.94%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3);',
    bgG19: darkMode
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(44, 37, 74, 0.5);'
      : 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(44, 37, 74, 0.5);',
    //specialty colors
    borderG1: darkMode
      ? 'linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);'
      : 'linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);',
    borderG2: darkMode
      ? 'linear-gradient(116.36deg, rgb(123, 66, 169) 33.43%, rgb(237, 3, 118) 95.41%), rgb(12, 70, 156);'
      : 'linear-gradient(116.36deg, rgb(123, 66, 169) 33.43%, rgb(237, 3, 118) 95.41%), rgb(12, 70, 156);',
    borderG3: darkMode
      ? 'linear-gradient(90deg, rgba(237, 206, 255, 0) 0%, #edceff 4.92%, #edceff 94.53%, rgba(237, 206, 255, 0) 98.88%);'
      : 'linear-gradient(90deg, rgba(237, 206, 255, 0) 0%, #edceff 4.92%, #edceff 94.53%, rgba(237, 206, 255, 0) 98.88%);',
    modalBG: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
    divider: darkMode ? 'rgba(43, 43, 43, 0.435)' : 'rgba(43, 43, 43, 0.035)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#ff007a',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#9DF9B1',
    green2: '#9DF9B1B2',
    green3: '#9DF9B1B3',
    yellow1: '#e3a507',
    yellow2: '#ff8f00',
    yellow3: '#F3B71E',
    yellow4: '#F2F99D',
    orange: '#FF6D41',
    blue1: '#2172E5',
    blue2: '#5199FF',
    blue3: '#5B7BCF',
    orange1: '#FF6D41',

    error: '#ED0376',
    success: '#27AE60',
    warning: '#ff8f00',
    popUpInputBorder: darkMode ? '#7A02E0' : '#7A02E0',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main0(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={52} lineHeight={'56px'} color={'text1'} {...props} />
  },
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  main1(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} lineHeight={'30px'} color={'text1'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  body1(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text2'} lineHeight={'24px'} {...props} />
  },
  body2(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={17} color={'text1'} lineHeight={'24px'} {...props} />
  },
  body3(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} lineHeight={'21px'} color={'text2'} {...props} />
  },
  body4(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={18} lineHeight={'34px'} color={'text1'} {...props} />
  },
  body5(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} lineHeight={'33px'} color={'text2'} {...props} />
  },
  body6(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={17} color={'text1'} lineHeight={'40px'} {...props} />
  },
  popOver(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text2'} lineHeight={'17px'} {...props} />
  },
  status(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text2'} lineHeight={'32px'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  subHeader1(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} lineHeight={'21px'} {...props} />
  },
  buttonMuted(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={14} lineHeight={'21px'} {...props} />
  },
  titleBig(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={36} lineHeight={'56px'} {...props} />
  },
  titleSmall(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={18} lineHeight={'27px'} color={'text1'} {...props} />
  },
  title3(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={28} lineHeight={'56px'} color={'text1'} {...props} />
  },
  title4(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={36} lineHeight={'56px'} color={'text1'} {...props} />
  },
  title5(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={22} lineHeight={'33px'} color={'text1'} {...props} />
  },
  title6(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={16} lineHeight={'24px'} color={'text1'} {...props} />
  },
  title7(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={18} lineHeight={'40px'} color={'text1'} {...props} />
  },
  title8(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={28} lineHeight={'42px'} color={'text2'} {...props} />
  },
  title9(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={18} lineHeight={'40px'} color={'text1'} {...props} />
  },
  title10(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={12} lineHeight={'18px'} color={'text1'} {...props} />
  },
  title11(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={16} lineHeight={'24px'} color={'text1'} {...props} />
  },
  descriptionThin(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={16} lineHeight={'24px'} color={'text2'} {...props} />
  },
  description2(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={12} lineHeight={'18px'} color={'text2'} {...props} />
  },
  description3(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={12} lineHeight={'18px'} color={'text2'} {...props} />
  },
  description4(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={18} lineHeight={'29px'} color={'text2'} {...props} />
  },
  description5(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={22} lineHeight={'33px'} color={'text2'} {...props} />
  },
  description6(props: TextProps) {
    return <TextWrapper fontWeight={300} fontSize={28} lineHeight={'56px'} color={'text1'} {...props} />
  },
  description7(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={30} lineHeight={'45px'} color={'text2'} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  smallError(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={10} lineHeight={'15px'} color={'error'} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'error' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
