// US Public Holidays — extend as needed
// Key: "MM-DD" (recurring) or "YYYY-MM-DD" (one-off)

export interface Holiday {
  name: string
  emoji: string
}

const HOLIDAYS: Record<string, Holiday> = {
  '01-01': { name: "New Year's Day", emoji: '🎆' },
  '01-15': { name: 'MLK Day',        emoji: '✊' },
  '02-14': { name: "Valentine's Day",emoji: '❤️' },
  '02-17': { name: "Presidents' Day",emoji: '🇺🇸' },
  '03-17': { name: "St. Patrick's",  emoji: '🍀' },
  '04-20': { name: 'Easter',         emoji: '🐣' },
  '05-26': { name: 'Memorial Day',   emoji: '🪖' },
  '06-19': { name: 'Juneteenth',     emoji: '✊' },
  '07-04': { name: 'Independence Day', emoji: '🎇' },
  '09-01': { name: 'Labor Day',      emoji: '⚒️' },
  '10-31': { name: 'Halloween',      emoji: '🎃' },
  '11-11': { name: "Veterans Day",   emoji: '🪖' },
  '11-27': { name: 'Thanksgiving',   emoji: '🦃' },
  '12-24': { name: 'Christmas Eve',  emoji: '🎄' },
  '12-25': { name: 'Christmas',      emoji: '🎁' },
  '12-31': { name: "New Year's Eve", emoji: '🥂' },
}

export function getHoliday(dateStr: string): Holiday | null {
  // Try exact date first (YYYY-MM-DD), then MM-DD
  if (HOLIDAYS[dateStr]) return HOLIDAYS[dateStr]
  const monthDay = dateStr.slice(5) // "MM-DD"
  return HOLIDAYS[monthDay] ?? null
}

/** Returns all holidays in a given month (0-indexed) */
export function getHolidaysForMonth(
  year: number,
  month: number
): { date: string; holiday: Holiday }[] {
  const mm = String(month + 1).padStart(2, '0')
  const results: { date: string; holiday: Holiday }[] = []

  // Check every day in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    const dd = String(d).padStart(2, '0')
    const fullDate = `${year}-${mm}-${dd}`
    const holiday = getHoliday(fullDate)
    if (holiday) {
      results.push({ date: fullDate, holiday })
    }
  }

  return results
}
