import * as React from 'react'
import * as createSanityClient from '@sanity/client'
import { SiteSettings, Track, SanityClient } from '../../types'
import { parseData } from './parseData'
import { siteDataQuery, ExpectedQueryResult } from './query'
/**
 * Context Setup
 */

interface SiteDataContextValue extends DataState {
  /* */
  getTrack: (trackSlug: string) => Track | void
}

const SiteDataContext = React.createContext<SiteDataContextValue | undefined>(
  undefined
)

export const SiteDataConsumer = SiteDataContext.Consumer

export const useSiteData = () => {
  const ctx = React.useContext(SiteDataContext)
  if (!ctx)
    throw new Error('useSiteDataContext must be used within a SiteDataProvider')
  return ctx
}

/**
 * State & Reducer
 */

const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'

export interface SiteData {
  settings: SiteSettings
  tracks: Track[]
}

interface DataState {
  loading: boolean
  data?: SiteData
  error?: string
}

interface Action {
  type: typeof FETCH_SUCCESS | typeof FETCH_ERROR
  data?: SiteData
  errorMessage?: string
}

const initialState: DataState = {
  loading: true,
}

const siteDataReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.errorMessage,
      }
    default:
      return state
  }
}

/**
 * Provider
 */

interface SiteDataProps {
  children: React.ReactNode
  client: SanityClient
}

export const SiteDataProvider = ({ children, client }: SiteDataProps) => {
  const [state, dispatch] = React.useReducer(siteDataReducer, initialState)

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await client
        .fetch<ExpectedQueryResult>(siteDataQuery)
        .then((result) => {
          const data = parseData(result)
          dispatch({ type: FETCH_SUCCESS, data })
        })
        .catch((err) => {
          dispatch({ type: FETCH_ERROR, errorMessage: 'sorry!' })
        })
    }
    fetchData()
  }, [])

  const getTrack = (trackSlug: string) =>
    state.data && state.data.tracks
      ? state.data.tracks.find((t) => t.slug === trackSlug)
      : undefined

  const value = {
    ...state,
    getTrack,
  }

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  )
}
