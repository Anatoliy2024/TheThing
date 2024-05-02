import Image from "next/image"
import avatarSrc from "../header/avatar.jpg"
import clsx from "clsx"

export function Profile({ className, name, avatar = avatarSrc }) {
  return (
    <div className={clsx("flex items-center gap-2 text-start", className)}>
      <Image className="rounded-full" width={42} unoptimized src={avatar} />
      <div className="overflow-hidden">
        <div className="truncate  px-1">{name}</div>
      </div>
    </div>
  )
}
