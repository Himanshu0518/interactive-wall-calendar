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
