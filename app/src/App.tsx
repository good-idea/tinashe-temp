import * as React from 'react'
import * as createSanityClient from '@sanity/client'
import { Router } from '@reach/router'
import { ThemeProvider } from '@xstyled/styled-components'
import { Home } from './views/Home'
import { TrackDetails } from './views/TrackDetails'
import { SiteDataProvider } from './context/SiteData'
import { Navigation } from './views/Navigation'
import { theme, GlobalStyles } from './theme'

const client = createSanityClient({
  projectId: 'eiufuzvv',
  dataset: 'production',
  useCdn: true,
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <SiteDataProvider client={client}>
          <Navigation />
          <Router>
            <Home path="/" />
            <TrackDetails path="/tracks/:trackName" />
          </Router>
        </SiteDataProvider>
      </>
    </ThemeProvider>
  )
}
