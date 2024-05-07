import clsx from "clsx"

export function UiCard({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        className,
        "min-w-[150px]    rounded-xl hover:scale-[2] duration-300 transition-transform hover:-translate-y-12"
      )}
    >
      {children}
    </div>
  )
}
