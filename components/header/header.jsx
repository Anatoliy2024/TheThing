import Image from "next/image"
import image from "./icons1.jpg"
import { UiButton } from "../uikit/ui-button"
import { ArrowDownIcon } from "./icons/arrow-down-icon"
import { Profile } from "../profile"
export function Header() {
  return (
    <div className="flex h-18 px-4 items-center gap-4 text-lime-200 bg-black">
      <div className="flex gap-2 items-center">
        <Image src={image} height={55} alt="Icons" />
        <div className="text-2xl font-permanent">The Thing</div>
      </div>
      <div className="w-px h-10 bg-lime-600 mx-6" />

      <UiButton variant="classic">Правила игры</UiButton>

      <button className="ml-auto flex gap-2 items-center  max-w-45">
        <Profile name="Макриди" />
        <ArrowDownIcon />
      </button>
    </div>
  )
}
