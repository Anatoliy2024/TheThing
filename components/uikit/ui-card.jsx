import clsx from "clsx"

export function UiCard({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(className, "min-w-[150px]    rounded-xl ")}
    >
      {children}
    </div>
  )
}
