'use client'

import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'

const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', label: 'January • Winter' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80', label: 'February • Love' },
  { url: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=600&q=80', label: 'March • Spring' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80', label: 'April • Bloom' },
  { url: 'https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?w=600&q=80', label: 'May • Garden' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', label: 'June • Beach' },
  { url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80', label: 'July • Mountains' },
  { url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80', label: 'August • Sunflowers' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', label: 'September • Autumn' },
  { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80', label: 'October • Foliage' },
  { url: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=80', label: 'November • Mist' },
  { url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80', label: 'December • Snow' },
]

export function HeroImage() {
  const currentMonth = useAppSelector((s) => s.calendar.currentMonth)
  const img = MONTH_IMAGES[currentMonth]

  // Fade on month change
  const [visible, setVisible] = useState(true)
  const [displayedMonth, setDisplayedMonth] = useState(currentMonth)

  useEffect(() => {
    if (currentMonth === displayedMonth) return
    setVisible(false)
    const t = setTimeout(() => {
      setDisplayedMonth(currentMonth)
      setVisible(true)
    }, 200)
    return () => clearTimeout(t)
  }, [currentMonth, displayedMonth])

  const displayImg = MONTH_IMAGES[displayedMonth]

  return (
    <div className="hero-image-panel">
      <div className="hero-gradient" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={displayImg.url}
        alt={displayImg.label}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Month label */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 2, padding: '0.75rem 1rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          {displayImg.label}
        </p>
      </div>

      {/* Hole punches */}
      <div style={{
        position: 'absolute', top: '0.6rem',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '2rem', zIndex: 3,
      }}>
        {[0, 1].map((i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
          }} />
        ))}
      </div>
    </div>
  )
}
