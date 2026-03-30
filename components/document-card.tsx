import { FileText } from "lucide-react"

interface DocumentCardProps {
  title: string
  subtitle: string
  gradient: string
  onClick?: () => void
}

export function DocumentCard({ title, subtitle, gradient, onClick }: DocumentCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 h-48 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg ${gradient}`}
    >
      {/* Watermark document icons */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20">
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {[...Array(3)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-6 h-8 bg-white/40 rounded-sm flex items-center justify-center"
                >
                  <div className="w-3 h-0.5 bg-white/60 rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <h3 className="text-2xl font-bold text-gray-800 leading-tight max-w-[60%]">
          {title}
        </h3>
        <p className="text-base font-medium text-gray-700">{subtitle}</p>
      </div>
    </div>
  )
}
