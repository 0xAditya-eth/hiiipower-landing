import { ImageResponse } from 'next/og'

export const alt = "Find your data's worth. — What Big Tech made off your data."
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          padding: '80px',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}
        >
          Find your data's worth.
        </div>

        {/* Hook line */}
        <div
          style={{
            fontSize: 36,
            color: '#a1a1aa',
            marginBottom: 60,
            textAlign: 'center',
          }}
        >
          What Big Tech made off your data.
        </div>

        {/* Large dollar sign graphic */}
        <div
          style={{
            fontSize: 240,
            fontWeight: 900,
            color: '#52525b',
            marginBottom: 80,
            opacity: 0.6,
          }}
        >
          $
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 28,
            color: '#71717a',
          }}
        >
          hiiipower.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
