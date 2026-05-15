import {
  Fraunces,
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
} from 'next/font/google'

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist',
  display: 'swap',
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
})

export const fontVariables = `${bricolage.variable} ${geist.variable} ${geistMono.variable} ${fraunces.variable}`
