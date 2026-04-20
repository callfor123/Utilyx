'use client'

import React, { useState } from 'react'

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState('59, 130, 246')
  const [hsl, setHsl] = useState('217, 91%, 60%')

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Convertisseur de Couleurs</h2>
        <p className="text-sm text-muted-foreground">Convertissez entre HEX, RGB, HSL et CMYK</p>
      </div>
      <div className="w-full h-32 rounded-lg border" style={{ backgroundColor: hex }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">HEX</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
            placeholder="#3b82f6"
          />
        </div>
        <div>
          <label className="text-sm font-medium">RGB</label>
          <input
            type="text"
            value={rgb}
            onChange={(e) => setRgb(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
            placeholder="59, 130, 246"
          />
        </div>
        <div>
          <label className="text-sm font-medium">HSL</label>
          <input
            type="text"
            value={hsl}
            onChange={(e) => setHsl(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background"
            placeholder="217, 91%, 60%"
          />
        </div>
        <div>
          <label className="text-sm font-medium">CMYK</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 rounded-md border bg-background opacity-60"
            placeholder="76, 47, 0, 4"
            readOnly
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Saisissez une couleur dans n&apos;importe quel format pour voir les conversions instantanément.
      </p>
    </div>
  )
}
