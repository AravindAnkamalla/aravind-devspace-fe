'use client'

type Experience = {
  id: string
  title: string
  company: string
  startDate: string
  endDate?: string
}

type Props = {
  experience: Experience
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function ExperienceCard({ experience, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-md p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{experience.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {experience.company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {experience.startDate} - {experience.endDate || 'Present'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(experience.id)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(experience.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
