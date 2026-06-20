import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2EBFA5',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            color: '#0F1E2E',
            fontSize: '22px',
            fontWeight: 900,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginTop: '1px',
          }}
        >
          T
        </span>
      </div>
    ),
    { ...size }
  )
}
