import { cn } from '@/lib/utils'

interface ResultCardProps {
  label: string
  value: string
  highlight?: boolean
  subtext?: string
}

export default function ResultCard({ label, value, highlight = false, subtext }: ResultCardProps) {
  return (
    <div className="bg-surface-raised rounded-lg border border-white/10 p-4">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p
        className={cn(
          'text-2xl font-semibold data-mono',
          highlight ? 'text-amber' : 'text-foreground'
        )}
      >
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      )}
    </div>
  )
}
