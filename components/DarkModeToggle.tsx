'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  // Only run on client
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDark(true)
    }
  }, [])

  // Apply theme changes to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
