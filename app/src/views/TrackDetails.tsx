import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useSiteData } from '../context/SiteData'
import { NotFound } from './NotFound'

interface TrackDetailsProps {
  path: string
  trackName: string
}

export const TrackDetails = (props: TrackDetailsProps) => {
  const { getTrack } = useSiteData()
  const track = getTrack(props.trackName)
  console.log(track)
  console.log(props)
  if (!track) return <NotFound />

  return null
}
