import clsx from "clsx"

export function UiTrick({ className, children, onClick }) {
  return (
    <div
      className={clsx(
        className,
        "min-w-[150px] border border-lime-600 rounded-xl	 flex justify-center items-center text-lime-600 select-none cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
