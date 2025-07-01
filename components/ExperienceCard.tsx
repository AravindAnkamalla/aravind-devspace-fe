'use client'

type Experience = {
  id: string
  image?: string | null
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
}

type Props = {
  experience: Experience
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function ExperienceCard({ experience, onEdit, onDelete }: Props) {
  const { id, title, company, location, startDate, endDate, description, image } = experience

  const formatDate = (date: string | undefined) => {
    if (!date) return 'Present'
    const d = new Date(date)
    return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`
  }

  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-sm p-5 flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 rounded-full object-cover border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm">
            {company?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company}{location ? ` · ${location}` : ''}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDate(startDate)} — {formatDate(endDate)}
            </p>
          </div>
          <div className="flex gap-2 mt-1">
            {/* <button
              onClick={() => onEdit(id)}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit
            </button> */}
            {/* <button
              onClick={() => onDelete(id)}
              className="text-xs text-red-600 hover:underline"
            >
              Delete
            </button> */}
          </div>
        </div>

        {description && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
