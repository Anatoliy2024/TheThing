// import { Header } from '../components/header'
import image from "./image.jpg"
import Image from "next/image"
import { Header } from "../components/header"
import { Game } from "../components/game"
export default function HomePage() {
  return (
    <HomePageLayout header={<Header />}>
      <Game />
      {/* <div className="">
        <Image src={image} alt="img" />
      </div> */}
    </HomePageLayout>
  )
}

function HomePageLayout({ header, children }) {
  return (
    <div className="bg-gray-900	 min-h-screen">
      {header}
      <main className="pt-6 px-2  ">{children}</main>
    </div>
  )
}
