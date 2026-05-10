import React, { useState, useEffect } from 'react'
import { useDrops } from '../../hooks/useDrops'

export const UpcomingDropBanner: React.FC = () => {
  const { data: drops } = useDrops()
  const [countdown, setCountdown] = useState<string>('')

  // Encontrar el próximo drop con fecha futura
  const nextDrop = drops.find(drop => {
    if (!drop.date) return false
    return new Date(drop.date) > new Date()
  })

  useEffect(() => {
    if (!nextDrop?.date) return

    const updateCountdown = () => {
      const targetDate = new Date(nextDrop.date!)
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown('Disponible ahora')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setCountdown(`${days}d ${hours}h ${minutes}m`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)

    return () => clearInterval(interval)
  }, [nextDrop?.id, nextDrop?.date])

  if (!nextDrop) return null

  return (
    <div className="sticky top-0 bg-slate-900 text-white z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 lg:px-6 py-2">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="text-xs font-light tracking-widest uppercase text-white/60">Proximamente:</p>
            <p className="text-xs font-light tracking-widest uppercase text-white">{nextDrop.name}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-xs font-light tracking-widest uppercase text-white/60">{countdown || 'Cargando...'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingDropBanner
