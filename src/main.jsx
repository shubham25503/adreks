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

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dynamic page title management
    if (pathname === '/') {
      document.title = 'ADREXKS | Digital Marketing & Creative Agency';
    } else if (pathname === '/studio') {
      document.title = 'Studio & Leadership | Adrexks';
    } else if (pathname === '/services') {
      document.title = 'Capabilities & Services | Adrexks';
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.split('/')[2];
      const match = SERVICES_DATA.find((s) => s.slug === slug);
      document.title = match ? `${match.title} | Adrexks` : 'Service Details | Adrexks';
    } else if (pathname === '/work') {
      document.title = 'Selected Work | Adrexks';
    } else if (pathname === '/contact') {
      document.title = 'Contact & Project Briefs | Adrexks';
    } else {
      document.title = 'Page Not Found | Adrexks';
    }
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
