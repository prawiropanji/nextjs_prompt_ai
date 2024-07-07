'use client';

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type Props = {
    children:  ReactNode
    session?: Session 
}

export default function Provider({children}: Props) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}