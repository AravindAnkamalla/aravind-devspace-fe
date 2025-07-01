'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function ProjectForm() {
  const params = useSearchParams()
  const id = params.get('id')
  const router = useRouter()


  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    techStacks: '',
    githubLink: '',
    liveLink: '',
    linkedinLink: '',
  })

  const { data } = useQuery({
    queryKey: ['project', id],
    enabled: !!id,
    queryFn: async () => {
      
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`)
      return res.data
    },
    // onSuccess: (proj: any) => {
    //   setForm({
    //     ...proj,
    //     techStacks: proj.techStacks.join(', ')
    //   })
    // }
  })

  const mutation = useMutation({
    mutationFn: async (dataPayload: any) => {
      const payload = {
        ...dataPayload,
        techStacks: dataPayload.techStacks.split(',').map((s: string) => s.trim()),
      }
      if (id) {
        return axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, payload
        )
      }
      return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, payload
      )
    },
    onSuccess: () => {
      router.push('/my-projects')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(form)
      }}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">{id ? 'Edit' : 'Create'} Project</h2>

      {[
        { name: 'title', label: 'Project Title' },
        { name: 'description', label: 'Description' },
        { name: 'image', label: 'Project Image URL' },
        { name: 'techStacks', label: 'Tech Stacks (comma separated)' },
        { name: 'githubLink', label: 'GitHub Link' },
        { name: 'liveLink', label: 'Live Link' },
        { name: 'linkedinLink', label: 'LinkedIn Post Link' },
      ].map(({ name, label }) => (
        <div key={name}>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
          <input
            type="text"
            name={name}
            value={(form as any)[name]}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            placeholder={label}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required={name === 'title' || name === 'description'}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        {mutation.isPending ? 'Saving...' : id ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  )
}
