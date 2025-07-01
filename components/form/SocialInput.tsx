interface Props {
  platform: 'github' | 'linkedin' | 'instagram'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const icons: Record<string, string> = {
  github: '🐙',
  linkedin: '💼',
  instagram: '📸',
}

export default function SocialInput({ platform, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {icons[platform]} {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </label>
      <input
        type="url"
        className="w-full mt-1 p-2 border rounded"
        value={value}
        onChange={onChange}
        placeholder={`https://${platform}.com/yourprofile`}
      />
    </div>
  )
}
