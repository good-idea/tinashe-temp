import * as React from 'react'
import * as createSanityClient from '@sanity/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@xstyled/styled-components'
import { Home } from './views/Home'
import { TrackDetails } from './views/TrackDetails'
import { SiteDataProvider } from './context/SiteData'
import { Navigation } from './views/Navigation'
import { NotFound } from './views/NotFound'
import { MailerSignup } from './components/MailerSignup'
import { Main } from './components/Layout'
import { theme, GlobalStyles } from './theme'

const client = createSanityClient({
  projectId: 'eiufuzvv',
  dataset: 'production',
  useCdn: true,
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <SiteDataProvider client={client}>
          <Main>
            <Navigation />
            <Route path="/" exact component={MailerSignup} />
          </Main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tracks/:trackName" component={TrackDetails} />
            <Route component={NotFound} />
          </Switch>
        </SiteDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
