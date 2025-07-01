interface Props {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  activeField: string
  setActiveField: (val: string) => void
  textarea?: boolean
}

export default function InputField({ label, value, onChange, activeField, setActiveField, textarea }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {textarea ? (
        <textarea
          className="w-full mt-1 p-2 border rounded"
          value={value}
          onChange={onChange}
          rows={4}
          onFocus={() => setActiveField(label)}
          onBlur={() => setActiveField('')}
        />
      ) : (
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={value}
          onChange={onChange}
          onFocus={() => setActiveField(label)}
          onBlur={() => setActiveField('')}
        />
      )}
    </div>
  )
}
