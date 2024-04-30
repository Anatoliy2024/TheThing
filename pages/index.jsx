// import { Header } from '../components/header'
import image from "./image.jpg"
import Image from "next/image"
import { Header } from "../components/header"
export default function HomePage() {
  return (
    <HomePageLayout header={<Header />}>
      <div className="">
        <Image src={image} alt="img" />
      </div>
    </HomePageLayout>
  )
}

function HomePageLayout({ header, children }) {
  return (
    <div className="bg-gray-900	 min-h-screen">
      {header}
      <main className="pt-6 mx-auto w-max">{children}</main>
    </div>
  )
}
