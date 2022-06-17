import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header'
import Container from './container'

export default function Layout({ preview, alertMessage, header, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-[90vh]">
        <Alert preview={preview} alertMessage={alertMessage} />
        <main>
          <Container>
            <Header data={header} />
            {children}
          </Container>
        </main>
      </div>
      <Footer />
    </>
  )
}
