import clsx from "clsx"

/**
 *
 * @param {{
 * children:any,
 * className:string,
 * variant:'active'|'search'
 *
 * }} props
 * */
export function UiButton({ children, className, variant }) {
  const buttonClassName = clsx(
    "transition-colors rounded px-8 py-1 text-slate-950 text-xl	",
    className,
    { active: "bg-lime-500", search: "bg-lime-200" }[variant]
  )

  return <button className={buttonClassName}>{children}</button>
}
