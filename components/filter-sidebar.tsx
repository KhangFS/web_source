"use client"

import { useState } from "react"

interface FilterOption {
  label: string
  selected?: boolean
}

interface FilterSection {
  title: string
  options: FilterOption[]
}

const filterSections: FilterSection[] = [
  {
    title: "Category",
    options: [
      { label: "Computer Science", selected: true },
      { label: "Business" },
      { label: "Law" },
    ],
  },
  {
    title: "File Type",
    options: [{ label: "HTML" }, { label: "PNG" }],
  },
  {
    title: "Subject",
    options: [{ label: "Business" }, { label: "Engineering" }],
  },
  {
    title: "Date Uploaded",
    options: [{ label: "Date Uploaded" }, { label: "2023-02-29" }],
  },
]

export function FilterSidebar() {
  const [sections, setSections] = useState(filterSections)

  const toggleOption = (sectionIndex: number, optionIndex: number) => {
    setSections((prev) =>
      prev.map((section, sIdx) =>
        sIdx === sectionIndex
          ? {
              ...section,
              options: section.options.map((opt, oIdx) =>
                oIdx === optionIndex ? { ...opt, selected: !opt.selected } : opt
              ),
            }
          : section
      )
    )
  }

  return (
    <aside className="w-64 p-6 bg-white/50">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filter</h2>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.title}>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.options.map((option, optionIndex) => (
                <button
                  key={option.label}
                  onClick={() => toggleOption(sectionIndex, optionIndex)}
                  className={`w-full text-left px-4 py-2 text-sm rounded-full border transition-all ${
                    option.selected
                      ? "bg-gradient-to-r from-purple-100 to-pink-50 border-purple-200 text-purple-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
