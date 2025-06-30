'use client'
export default function SkillBadges({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span key={s} className="bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded-full text-sm">
          {s}
        </span>
      ))}
    </div>
  )
}
