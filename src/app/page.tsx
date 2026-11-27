import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Work from '@/components/Work';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a href="#work" className="skip">
        Skip to work
      </a>
      <Header />
      <main id="top">
        <Intro />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
