import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import { Preloader } from './components/Preloader';
import { SiteEffects } from './components/Effects';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useLocation } from './components/Router';

import { HomePage } from './pages/HomePage';
import { StudioPage } from './pages/StudioPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICES_DATA } from './data/servicesData';
import { applyRouteSeo } from './utils/seo';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyRouteSeo(pathname, SERVICES_DATA);
  }, [pathname]);

  let pageContent;
  if (pathname === '/') {
    pageContent = <HomePage />;
  } else if (pathname === '/studio') {
    pageContent = <StudioPage />;
  } else if (pathname === '/services') {
    pageContent = <ServicesPage />;
  } else if (pathname.startsWith('/services/')) {
    const slug = pathname.split('/')[2];
    pageContent = <ServiceDetailPage slug={slug} />;
  } else if (pathname === '/work') {
    pageContent = <WorkPage />;
  } else if (pathname === '/contact') {
    pageContent = <ContactPage />;
  } else {
    pageContent = <NotFoundPage />;
  }

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <Preloader />
      <SiteEffects />
      <Navbar />
      <main key={pathname}>{pageContent}</main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
