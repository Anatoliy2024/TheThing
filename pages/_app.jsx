import "../styles/global.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div id="modals"></div>
    </>
  )
}
