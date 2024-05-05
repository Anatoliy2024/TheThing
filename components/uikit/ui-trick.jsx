import clsx from "clsx"

export function UiTrick({ className, children }) {
  return (
    <div
      className={clsx(
        className,
        "min-w-[150px] border border-lime-600 rounded-3xl	"
      )}
    >
      {children}
    </div>
  )
}
