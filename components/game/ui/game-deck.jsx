import Image from "next/image"
import { CARD } from "../constants.js"
import { UiTrick } from "../../uikit/ui-trick.jsx"

export function GameDeck({ optionPlayers, dispatch }) {
  return (
    <div className="flex-game">
      <div className="rounded-xl min-h-[600px] px-1 py-1 bg-sky-950 flex flex-col py-10 ">
        <div className="flex gap-10 justify-center  mx-10 ">
          <UiTrick>
            <Image
              alt="колода"
              src={optionPlayers.pack[0].shirt}
              className="max-w-[150px] p-1 rounded-3xl"
            />
          </UiTrick>
          <UiTrick>Активная карта</UiTrick>
          <UiTrick>
            <Image
              alt="бита"
              src={optionPlayers.pack[33].shirt}
              className="max-w-[150px] p-1 rounded-3xl"
            />
          </UiTrick>

          {/* <div>Активная карта</div>
          <div>Бито</div> */}
        </div>
        <div className="flex justify-center">2:00</div>
        <div className="flex justify-center">Возьмите карту из колоды</div>
        <div className="flex justify-center"></div>
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
