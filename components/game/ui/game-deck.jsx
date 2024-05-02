import Image from "next/image"
import { CARD } from "../constants.js"

export function GameDeck() {
  return (
    <div>
      <div className="rounded-xl min-h-[600px] px-1 py-1 bg-sky-950 flex flex-col">
        <div className="flex gap-10 mx-auto">
          <div>Колода</div>
          <div>Активная карта</div>
          <div>Бито</div>
        </div>
        <div className="flex justify-center">2:00</div>
        <div></div>
        {/* {CARD.map((elem) => {
          return (
            <div
              key={elem.id}
              className="w-30 rounded-2xl overflow-hidden hover:scale-[2]"
            >
              <Image src={elem.image} alt={elem.name} unoptimized width={180} />
            </div>
          )
        })} */}
      </div>
    </div>
  )
}
