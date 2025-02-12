'use client'

import { createContext, useContext, useState } from 'react'

type CopyContextType = {
  copiedId: string
  setCopiedId: (id: string) => void
}

const CopyContext = createContext<CopyContextType | undefined>(undefined)

export function CopyProvider({ children }: { children: React.ReactNode }) {
  const [copiedId, setCopiedId] = useState('')

  return (
    <CopyContext.Provider value={{ copiedId, setCopiedId }}>
      {children}
    </CopyContext.Provider>
  )
}

export function useCopy() {
  const context = useContext(CopyContext)
  if (context === undefined) {
    throw new Error('useCopy must be used within a CopyProvider')
  }
  return context
}