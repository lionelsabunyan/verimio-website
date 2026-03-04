'use client'

interface ProjectSwitcherProps {
  value: string
  onChange: (project: string) => void
}

const PROJECTS = [
  { id: 'all', label: 'Tümü', color: 'bg-white' },
  { id: 'verimio', label: 'Verimio', color: 'bg-[#A3E635]' },
  { id: 'bfg', label: 'BFG', color: 'bg-blue-400' },
]

export default function ProjectSwitcher({ value, onChange }: ProjectSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-[#1A1030] rounded-lg p-1">
      {PROJECTS.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            value === p.id
              ? 'bg-[#2E1065] text-white'
              : 'text-[#4C4462] hover:text-white'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${p.color}`} />
          {p.label}
        </button>
      ))}
    </div>
  )
}
