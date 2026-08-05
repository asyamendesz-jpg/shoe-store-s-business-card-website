import { type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import { LanguageProvider } from './context/LanguageContext'
import { ScrollManager } from './components/ScrollManager'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { OfferPage } from './pages/OfferPage'
import { AdminPage } from './pages/AdminPage'

function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter
          basename={
            import.meta.env.DEV ? undefined : '/shoe-store-s-business-card-website'
          }
        >          <ScrollManager />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/cart"
              element={
                <PageShell>
                  <CartPage />
                </PageShell>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageShell>
                  <PrivacyPage />
                </PageShell>
              }
            />
            <Route
              path="/offer"
              element={
                <PageShell>
                  <OfferPage />
                </PageShell>
              }
            />
            <Route
              path="/admin"
              element={
                <PageShell>
                  <AdminPage />
                </PageShell>
              }
            />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  )
}

export default App
