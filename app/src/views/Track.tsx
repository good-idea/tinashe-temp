import * as React from 'react'

interface TrackProps {
  slug: string
  title: string
  trackNumber: number
  releaseDate: string
}

export const Track = (props: TrackProps) => {
  console.log(props)
  return <div>Track</div>
}
