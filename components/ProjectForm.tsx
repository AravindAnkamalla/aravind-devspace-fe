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
  const { getToken } = useAuth()

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
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
    // onSuccess: (proj:any) => {
    //   setForm({
    //     ...proj,
    //     techStacks: proj.techStacks.join(', '),
    //   })
    // },
  })

  const mutation = useMutation({
    mutationFn: async (dataPayload: any) => {
      const token = await getToken()
      const payload = { ...dataPayload, techStacks: dataPayload.techStacks.split(',').map((s: string) => s.trim()) }
      if (id) {
        return axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
      }
      return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, payload, { headers: { Authorization: `Bearer ${token}` } })
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
      className="space-y-4 max-w-xl mx-auto p-4"
    >
      {['title','description','image','techStacks','githubLink','liveLink','linkedinLink'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={(form as any)[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="w-full p-2 border rounded"
          required={field === 'title' || field === 'description'}
        />
      ))}
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        {id ? 'Update' : 'Create'} Project
      </button>
    </form>
  )
}
