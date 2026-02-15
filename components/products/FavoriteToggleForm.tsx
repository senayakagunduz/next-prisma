'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type FavoriteToggleFormProps = {
  productId: string
  favoriteId: string | null
}

export default function FavoriteToggleForm({ productId, favoriteId }: FavoriteToggleFormProps) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [favId, setFavId] = useState<string | null>(favoriteId)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, favoriteId: favId, pathname }),
      })
      const data = await res.json()
      // toggleFavoriteAction'ın döndürdüğü yapıya göre ayarla
      if (data.favoriteId !== undefined) setFavId(data.favoriteId)
      // fallback: eğer sadece message dönüyorsa toggle olarak işle
      else setFavId(prev => (prev ? null : 'temp-id'))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleToggle} disabled={loading} className="p-2">
      {loading ? '...' : favId ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
