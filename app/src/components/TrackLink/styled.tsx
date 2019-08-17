import styled, { css } from '@xstyled/styled-components'
import { Li, Header5 } from '../Text'

interface TextWrapperProps {
  isReleased: boolean
  active: boolean
}

export const TextWrapper = styled(Li)`
  ${({ isReleased, active }: TextWrapperProps) => css`
    position: relative;
    font-size: 2;
    ${isReleased
      ? ''
      : `
    filter: blur(2px);
    `}

    a {
      color: inherit;
      text-decoration: none;
    }

    & + & {
      margin-top: 4;
    }
  `}
`

interface TrackTitleProps {
  active: boolean
}
export const TrackTitle = styled.div`
  ${({ active }: TrackTitleProps) => css`
    ${active
      ? `
      
      mix-blend-mode: difference;
      `
      : ''}
  `}
`

export const LinkButton = styled.button`
  font: inherit;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  color: inherit;
`

export const TrackNumber = styled(Header5)`
  ${({ theme }) => css`
    position: absolute;
    width: ${theme.space[8]};
    height: 100%;
    right: 100%;
    margin: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

export const TrackButtons = styled.span`
  color: white;

  & > * {
    margin-left: 6;
  }
`
