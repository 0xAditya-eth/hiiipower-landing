import { ImageResponse } from 'next/og'

export const alt = "AI or Not — Can you tell what's real?"
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
          AI or Not
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
          10 photos. Half are AI.
        </div>

        {/* Grid of 10 empty squares */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 80,
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#27272a',
                borderRadius: 8,
              }}
            />
          ))}
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
