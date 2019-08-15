import * as React from 'react'
import * as createSanityClient from '@sanity/client'
import { SiteSettings, Track } from '../../types'
import { parseData } from './parseData'
import { siteDataQuery } from './query'

const client = createSanityClient({
  projectId: 'eiufuzvv',
  dataset: 'production',
  useCDN: true,
})

/**
 * Context Setup
 */

interface SiteDataContextValue {
  loading: boolean
  data: SiteData
  /* */
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
  errorMessage?: string
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
        errorMessage: action.errorMessage,
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
}
export const SiteDataProvider = ({ children }: SiteDataProps) => {
  const [state, dispatch] = React.useReducer(siteDataReducer, initialState)

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(siteDataQuery)
      console.log(data)
      console.log(parseData(data))
    }
    fetchData()
  }, [])

  const value = {
    ...state,
    /* */
  }

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  )
}
