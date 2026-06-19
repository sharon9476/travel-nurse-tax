import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F1E2E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '48px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: '#2EBFA5',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: '#0F1E2E',
              fontWeight: 900,
            }}
          >
            T
          </div>
          <span style={{ color: '#F7F5F2', fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            TravelNurseTax
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: '#F7F5F2',
            fontSize: '58px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '28px',
            maxWidth: '960px',
            letterSpacing: '-0.03em',
          }}
        >
          Tax tools built for how travel nursing actually works.
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: '#2EBFA5',
            fontSize: '28px',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Contract analyzer · Tax home quiz · Per diem checker · Free.
        </div>

        {/* URL pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            background: 'rgba(46,191,165,0.12)',
            border: '1px solid rgba(46,191,165,0.3)',
            borderRadius: '100px',
            padding: '10px 28px',
            color: '#2EBFA5',
            fontSize: '20px',
          }}
        >
          travelnursetax.app
        </div>
      </div>
    ),
    { ...size }
  )
}
