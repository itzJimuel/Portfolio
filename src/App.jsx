import { sections } from './data/portfolio';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

// Maps each `id` in the data file's `sections` list to its component.
// Reorder or remove entries in `sections` to change the page layout.
const SECTION_COMPONENTS = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  education: Experience, // same component; shows whichever timelines have entries
  contact: Contact,
};

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        {sections.map((section, i) => {
          const SectionComponent = SECTION_COMPONENTS[section.id];
          return SectionComponent ? <SectionComponent key={section.id} section={{ ...section, index: i + 1 }} /> : null;
        })}
      </main>

      <Footer />
    </>
  );
}
