import { DocumentCard } from './document-card';

const documents = [
  {
    title: 'Python Basics',
    subtitle: 'Python',
    gradient: 'bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200',
  },
  {
    title: 'Financial Modeling',
    subtitle: 'Financial',
    gradient: 'bg-gradient-to-br from-purple-200 via-blue-100 to-cyan-200',
  },
  {
    title: 'Design',
    subtitle: 'Design',
    gradient: 'bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200',
  },
  {
    title: 'Python Basics',
    subtitle: 'Python',
    gradient: 'bg-gradient-to-br from-rose-100 via-pink-100 to-purple-200',
  },
  {
    title: 'Financial Modeling',
    subtitle: 'Financial',
    gradient: 'bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200',
  },
  {
    title: 'Design Principles',
    subtitle: 'Design',
    gradient: 'bg-gradient-to-br from-yellow-200 via-amber-100 to-orange-200',
  },
];

interface DocumentGridProps {
  onDocumentClick: (title: string) => void;
}

export function DocumentGrid({ onDocumentClick }: DocumentGridProps) {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-2 left-4 w-2 h-2 rounded-full bg-pink-300 opacity-60" />
      <div className="absolute top-8 left-0 w-3 h-3 rotate-45 bg-gradient-to-br from-pink-300 to-purple-300 opacity-50" />
      <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-cyan-300 opacity-50" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            subtitle={doc.subtitle}
            gradient={doc.gradient}
            onClick={() => onDocumentClick(doc.title)}
          />
        ))}
      </div>
    </div>
  );
}
