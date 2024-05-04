import clsx from "clsx"

/**
 *
 * @param {{
 * children:any,
 * className:string,
 * variant:'menu'|'classic', 'active'
 *
 * }} props
 * */
export function UiButton({ children, className, variant, onClick }) {
  const buttonClassName = clsx(
    "transition-colors rounded  text-slate-950  font-bold",
    className,
    {
      menu: "bg-lime-500 hover:bg-lime-400 active:bg-lime-200 px-8 py-2 text-3xl min-w-[300px] ",
      active:
        "bg-lime-700 hover:bg-lime-500 active:bg-lime-300 px-8 py-2 text-3xl min-w-[300px] ",
      classic:
        "bg-lime-500 hover:bg-lime-400 active:bg-lime-200 px-8 py-1 text-base ",
    }[variant]
  )

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  )
}
