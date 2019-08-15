import * as React from 'react'
import { Router } from '@reach/router'
import { Home } from './views/Home'
import { Track } from './views/Track'
import { SiteDataProvider } from './context/SiteData'

export const App = () => {
  return (
    <SiteDataProvider>
      <Router>
        <Home path="/" />
        <Track path="/tracks/:trackName" />
      </Router>
    </SiteDataProvider>
  )
}
