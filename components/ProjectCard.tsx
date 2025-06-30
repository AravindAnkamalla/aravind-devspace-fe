'use client'
import Link from 'next/link'
import SkillBadges from './SkillBadges'

export default function ProjectCard({ project }: any) {
  return (
    <Link href={`/my-projects/${project.id}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img src={project.image} alt={project.title} className="h-44 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <SkillBadges skills={project.techStacks} />
        </div>
      </div>
    </Link>
  )
}
