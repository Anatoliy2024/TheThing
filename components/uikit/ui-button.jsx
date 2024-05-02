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
    "transition-colors rounded px-8 py-1 text-slate-950  font-bold",
    className,
    {
      active: "bg-lime-500 hover:bg-lime-400 active:bg-lime-200",
      search: "bg-lime-200 hover:bg-lime-100 active:bg-lime-300",
    }[variant]
  )

  return <button className={buttonClassName}>{children}</button>
}
