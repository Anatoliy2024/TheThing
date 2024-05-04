export function GameLayout({ menu, option, game, search, status }) {
  return (
    <div className="flex justify-center items-center">
      {status === "menu" && (
        <div className=" flex flex-col gap-8 py-10">{menu}</div>
      )}
      {status === "option" && (
        <div className="flex  items-center flex-col text-lime-500 text-3xl bg-lime-950 rounded-3xl gap-7 px-12 py-7  ">
          {option}
        </div>
      )}
      {status === "search" && <div>{search}</div>}
      {status === "game" && <div className="flex w-full gap-3">{game}</div>}
    </div>
  )
}
