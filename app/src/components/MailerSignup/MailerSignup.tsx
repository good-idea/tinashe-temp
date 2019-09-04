import * as React from 'react'
import { Wrapper, Input, SubmitButton, ValidationText } from './styled'

const { useEffect, useReducer } = React

interface State {
  inputValue: string
  loading: boolean
  message?: string
  errored: boolean
  complete: boolean
}

const UPDATE = 'UPDATE'
const SUBMIT = 'SUBMIT'
const COMPLETE = 'COMPLETE'
const RESET = 'RESET'

interface UpdateAction {
  type: typeof UPDATE
  inputValue: string
}

interface SubmitAction {
  type: typeof SUBMIT
}

interface CompleteAction {
  type: typeof COMPLETE
  message: string
  errored?: boolean
}

interface ResetAction {
  type: typeof RESET
}

type Action = UpdateAction | SubmitAction | CompleteAction | ResetAction

const initialState = {
  inputValue: '',
  loading: false,
  message: undefined,
  complete: false,
  errored: false,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        complete: false,
        message: undefined,
        errored: false,
        inputValue: action.inputValue,
      }
    case SUBMIT:
      return {
        ...state,
        loading: true,
      }
    case COMPLETE:
      return {
        ...state,
        loading: false,
        complete: true,
        message: action.message,
        errored: Boolean(action.errored),
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration))

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const MailerSignup = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { inputValue, loading, message, errored, complete } = state
  const valid = emailRegex.test(inputValue)
  const success = complete && !errored

  /* Handlers */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: UPDATE, inputValue: e.target.value })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: SUBMIT })
    await sleep(800)
    const success = Math.random() > 0.5
    const message = success ? 'Thank you ♡' : 'Sorry, something went wrong :('
    const errored = !success

    dispatch({ type: COMPLETE, message, errored })
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        type="email"
        onChange={handleChange}
        value={inputValue}
        placeholder="Email Address"
      />
      <SubmitButton disabled={!valid || loading || success}>Join</SubmitButton>
      {message ? (
        <ValidationText errored={errored}>{message}</ValidationText>
      ) : null}
    </Wrapper>
  )
}
