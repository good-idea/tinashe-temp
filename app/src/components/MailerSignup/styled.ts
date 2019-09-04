import styled, { css } from '@xstyled/styled-components'
import { Header5 } from '../Text'

export const Wrapper = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid;
  max-width: 500px;
  min-width: 300px;
  width: 35vw;
`

export const Input = styled.input`
  font-family: sans;
  flex-grow: 1;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 2;
  width: 100%;
`

interface ValidationTextProps {
  errored?: boolean
}

export const ValidationText = styled(Header5)`
  ${({ errored }: ValidationTextProps) => css`
    position: absolute;
    top: calc(100% + 0.5em);
    left: 0;
    width: 100%;
    color: ${errored ? 'red' : 'inherit'};
  `}
`

export const SubmitButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  font-family: sans;
  font-size: 2;
  margin-left: 3;
`
