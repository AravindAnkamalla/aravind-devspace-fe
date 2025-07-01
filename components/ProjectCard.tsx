'use client'

import Link from 'next/link'
import SkillBadges from './SkillBadges'

type Props = {
  project: {
    id: string
    title: string
    description: string
    image: string
    techStacks: string[]
    githubLink: string
    liveLink: string
    linkedinLink: string
  }
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <img
        src={project.image}
        alt={project.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>

        <SkillBadges skills={project.techStacks} />

        <div className="flex gap-3 mt-3">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" className="text-blue-600 hover:underline text-sm">
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" className="text-green-600 hover:underline text-sm">
              Live
            </a>
          )}
          {project.linkedinLink && (
            <a href={project.linkedinLink} target="_blank" className="text-purple-600 hover:underline text-sm">
              LinkedIn
            </a>
          )}
        </div>

        <Link href={`/my-projects/${project.id}`} className="inline-block mt-2 text-blue-500 hover:underline text-sm">
          View Details →
        </Link>
      </div>
    </div>
  )
}
