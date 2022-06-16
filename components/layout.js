import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, alertMessage, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} alertMessage={alertMessage} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
