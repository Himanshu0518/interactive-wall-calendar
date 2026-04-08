<div align="center">
  <h1>🗓️ Interactive Wall Calendar</h1>
  <p>A polished, interactive wall calendar built with modern web technologies, featuring context-aware notes, dynamic theme switching, and smooth animations.</p>

  ![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-white?style=for-the-badge&logo=framer&logoColor=blue)
</div>

---

## ✨ Features

- **🗓️ Wall Calendar Aesthetic** — Beautiful hero image per month, hole-punch decorations, and a classic binding strip for a skeuomorphic feel.
- **📅 Date Range Selector** — Intuitive click start → hover preview → click end interaction. Distinct visual states for start, end, and in-range dates.
- **📝 Context-Aware Notes System** — Add custom notes tied to specific date ranges. The intelligent system automatically surfaces any notes whose date ranges overlap with your currently selected range. Notes are persistently saved to `localStorage`.
- **🎉 Dynamic Events Panel** — Displays holidays and events tailored to the selected date range or the current month.
- **🎨 5 Stunning Themes** — Choose between Classic, Midnight, Forest, Ocean, and Sunset. Features instant live-switching with smooth CSS variables.
- **✨ Fluid Animations** — Month transitions and event lists powered by `Framer Motion` for a premium, buttery-smooth user experience.
- **📱 Fully Responsive** — Adaptive layouts for desktop (hero + calendar side-by-side) and mobile (stacked layout).
- **⚡ Custom Hook Architecture** — Clean separation of logic with `useCalendar`, `useDateRange`, `useNotes`, and `useTheme`.

## 🛠️ Tech Stack

| Layer | Technology Choice |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **State Management** | Redux Toolkit |
| **UI Components** | shadcn/ui |
| **Styling** | Tailwind CSS v4 + CSS custom properties |
| **Animations** | Framer Motion |
| **Language** | TypeScript |
| **Storage** | LocalStorage (Notes Persistence) |

## 🏗️ Architecture Setup

```text
hooks/
  useCalendar.ts     — month navigation, day grid generation
  useDateRange.ts    — range selection, in-range checks, hover preview
  useNotes.ts        — localStorage integration, intelligent overlap checks
  useTheme.ts        — 5-theme system, applies data-theme to <html>

store/
  slices/
    calendarSlice.ts — global month state, user date range
    themeSlice.ts    — active theme configuration
  store.ts           — configureStore
  hooks.ts           — typed useAppDispatch / useAppSelector

components/
  calendar/
    CalendarHeader.tsx  — month title, nav buttons, interactive range pill
    CalendarGrid.tsx    — 7-col grid layout with Framer Motion transitions
    EventsPanel.tsx     — dynamic display showing overlapping events/holidays
    DayCell.tsx         — single day item rendering various range and 'today' states
    HeroImage.tsx       — dynamic, month-themed Unsplash hero banners
  notes/
    NotesPanel.tsx      — contextual textarea for notes tied to a selected range
  ThemeSwitcher.tsx     — dropdown palette picker
  WallCalendar.tsx      — root component, assembles the grid and UI elements
```

## 🚀 Getting Started

To run the project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager

### Installation

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm run dev
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm run build
pnpm run start
```

## 🧠 Design Decisions & Trade-offs

- **CSS Custom Properties for Theming:** Each theme applies specific `--cal-*` tokens to the root element. Components consume these tokens via mapped CSS classes. This sidesteps Tailwind class bloat and enables instant, flash-free theme swapping.
- **Redux + LocalStorage Split:** Temporary visual state (like the calendar's current month page and active date range selection) lives in Redux. However, persistent entity data (like the user's custom Notes) is synced with `localStorage`, providing reliable offline persistence without the overhead of a database backend.
- **Intelligent Overlap Detection:** Instead of relying strictly on exact string matches for note dates, the `useNotes` hook parses date bounds mathematically. This ensures that a note for "Jan 5 - Jan 10" will correctly appear even if the user broadly selects "Jan 1 - Jan 15".
- **Visual Performance Optimizations:** Over 40 `DayCell` components re-render continuously upon hovering during range selection. Strategic use of `React.memo()` trims this cascading update tree, drastically lowering main thread usage and maintaining a constant 60fps interaction loop.
- **Image Integration:** We utilize curated Unsplash image links for our monthly heroes—this allows rich visual context completely bypassing API key requirements. 

---
<div align="center">
  <i>Built with ❤️ using Next.js & Redux Toolkit.</i>
</div>
