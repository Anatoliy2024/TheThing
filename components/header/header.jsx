import Image from "next/image"
import image from "./icons1.jpg"
import { UiButton } from "../uikit/ui-button"
import { ArrowDownIcon } from "./icons/arrow-down-icon"

export function Header() {
  return (
    <div className="flex h-18 px-4 items-center gap-4 text-lime-200 bg-black">
      <div className="flex gap-2 items-center">
        <Image src={image} height={55} />
        <div className="text-2xl">The Thing</div>
      </div>
      <div className="w-px h-10 bg-lime-600 mx-6" />
      <div className=" flex gap-4">
        <UiButton variant="active">Новая игра</UiButton>
        <UiButton variant="search">Поиск игры</UiButton>
      </div>
      <button className="ml-auto flex gap-1 items-center">
        <div className="text-xl">Профиль</div>
        <ArrowDownIcon />
      </button>
    </div>
  )
}
