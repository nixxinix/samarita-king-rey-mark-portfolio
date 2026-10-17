/** Category buttons. `categories` comes from the projects data, so it stays in sync. */
export default function ProjectFilters({ categories, active, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Show projects by category">
      {categories.map((category) => (
        <button
          key={category}
          className="filter"
          type="button"
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
