# Interactive Wall Calendar

A polished, interactive wall calendar built with **Next.js 16**, **Redux Toolkit**, **shadcn/ui**, and **Tailwind CSS v4**.

## Features

- 🗓 **Wall Calendar Aesthetic** — Hero image per month, hole-punch decorations, binding strip
- 📅 **Date Range Selector** — Click start → hover preview → click end. Visual states for start, end, in-range
- 📝 **Notes System** — Add, edit (⌘Enter), delete notes attached to selected date ranges. Dot indicators on grid
- 🎨 **5 Themes** — Classic, Midnight, Forest, Ocean, Sunset — live-switching with smooth transitions
- 📱 **Fully Responsive** — Desktop: hero + calendar side-by-side. Mobile: stacked layout
- ⚡ **Custom Hook Architecture** — `useCalendar`, `useDateRange`, `useNotes`, `useTheme`

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| State | Redux Toolkit |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Language | TypeScript |

## Architecture

```
hooks/
  useCalendar.ts     — month navigation, day grid generation
  useDateRange.ts    — range selection, in-range checks, hover preview
  useNotes.ts        — CRUD for notes, notes grouped by date
  useTheme.ts        — 5-theme system, applies data-theme to <html>

store/
  slices/
    calendarSlice.ts — month state, date range, notes
    themeSlice.ts    — active theme
  store.ts           — configureStore
  hooks.ts           — typed useAppDispatch / useAppSelector

components/
  calendar/
    CalendarHeader.tsx  — month title, nav buttons, range pill
    CalendarGrid.tsx    — 7-col grid layout
    DayCell.tsx         — single day with all range/today states
    HeroImage.tsx       — month-themed Unsplash hero image
  notes/
    NotesPanel.tsx      — notes list + add form
    NoteItem.tsx        — inline edit/delete
  ThemeSwitcher.tsx     — dropdown palette picker
  WallCalendar.tsx      — root component, assembles everything
```

## Running Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design Decisions

- **CSS Custom Properties for theming** — each theme sets `--cal-*` tokens; components consume them via named CSS classes. This avoids Tailwind class explosions and makes theme-switching instant.
- **Redux for all shared state** — calendar position, range selection, and notes all live in Redux so any component can read/write without prop drilling.
- **`memo` on DayCell** — 42 cells re-render on every hover; memoizing them cuts unnecessary work.
- **Unsplash for hero images** — no API key required, one image per month hardcoded for reliability.
