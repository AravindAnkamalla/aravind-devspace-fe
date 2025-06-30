'use client'

import { useState, useEffect } from 'react'

export default function ExperienceForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    id: '',
    title: '',
    company: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="space-y-4"
    >
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {form.id ? 'Update' : 'Add'} Experience
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
