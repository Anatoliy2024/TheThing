export function UiSelect({ name, label, children, onChange }) {
  return (
    <div>
      <select
        className="bg-lime-800 mr-2.5 rounded text-slate-950 "
        name={name}
        id={name}
        onChange={onChange}
      >
        {children}
      </select>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
