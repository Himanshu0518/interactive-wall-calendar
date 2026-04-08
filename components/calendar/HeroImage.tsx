'use client'

import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

const MONTH_IMAGES = [
  { url: 'https://tse3.mm.bing.net/th/id/OIP.WR4BdROLfnDlgcPHdUHErQHaE7?pid=Api&P=0&h=180', label: 'January • Winter' },
  { url: 'https://tse3.mm.bing.net/th/id/OIP.UE63uzQfyR168YNDVkF4JQHaE8?pid=Api&P=0&h=180', label: 'February • Love' },
  { url: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=600&q=80', label: 'March • Spring' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80', label: 'April • Bloom' },
  { url: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?cs=srgb&dl=bushes-flora-flowers-158028.jpg&fm=jpg', label: 'May • Garden' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', label: 'June • Beach' },
  { url: 'https://up.yimg.com/ib/th/id/OIP.RlM10r9JQv4PHFlh5dLqpgHaEK?pid=Api&rs=1&c=1&qlt=95&w=218&h=122', label: 'July • Mountains' },
  { url: 'https://tse4.mm.bing.net/th/id/OIP.QQVjJaml_N0-IQp1m6D_TgHaE7?pid=Api&P=0&h=180', label: 'August • Sunflowers' },
  { url: 'https://tse4.mm.bing.net/th/id/OIP.5NhRiLjbTNhYOq7jKFfEmAHaE7?pid=Api&P=0&h=180', label: 'September • Autumn' },
  { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80', label: 'October • Foliage' },
  { url: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=80', label: 'November • Mist' },
  { url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80', label: 'December • Snow' },
]

export function HeroImage() {
  const { currentMonth, currentYear } = useAppSelector((s) => s.calendar)
  const [displayedMonth, setDisplayedMonth] = useState(currentMonth)
  const [displayedYear, setDisplayedYear] = useState(currentYear)
  const [imgKey, setImgKey] = useState(0)

  useEffect(() => {
    if (currentMonth === displayedMonth && currentYear === displayedYear) return
    // Small delay so exit animation plays first
    const t = setTimeout(() => {
      setDisplayedMonth(currentMonth)
      setDisplayedYear(currentYear)
      setImgKey((k) => k + 1)
    }, 50)
    return () => clearTimeout(t)
  }, [currentMonth, currentYear, displayedMonth, displayedYear])

  const img = MONTH_IMAGES[displayedMonth]

  // Use date-fns to format a readable label
  const monthLabel = format(new Date(displayedYear, displayedMonth, 1), 'MMMM yyyy')

  return (
    <div className="hero-image-panel">
      <div className="hero-gradient" />

      {/* Cross-fade image on month change */}
      <AnimatePresence mode="wait">
        <motion.img
          key={imgKey}
          src={img.url}
          alt={img.label}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            position: 'absolute',
            inset: 0,
          }}
        />
      </AnimatePresence>

      {/* Month + year label at bottom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${imgKey}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: '0.75rem 1rem',
          }}
        >
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>
            {monthLabel}
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '0.1rem',
          }}>
            {img.label.split('• ')[1]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Decorative hole punches */}
      <div style={{
        position: 'absolute',
        top: '0.6rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '2rem',
        zIndex: 3,
      }}>
        {[0, 1].map((i) => (
          <div key={i} style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
          }} />
        ))}
      </div>
    </div>
  )
}
