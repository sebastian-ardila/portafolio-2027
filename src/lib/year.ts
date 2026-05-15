const CAREER_START_YEAR = 2017

export function yearsInPractice(): number {
  const now = new Date()
  const start = new Date(CAREER_START_YEAR, 0, 1)
  const diffMs = now.getTime() - start.getTime()
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)
  return Math.floor(years)
}

export function currentYear(): number {
  return new Date().getFullYear()
}
