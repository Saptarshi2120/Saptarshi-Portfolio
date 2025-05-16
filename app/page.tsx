import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Dashboard from "@/components/dashboard"
import Certificates from "@/components/certificates"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="home" className="pt-20">
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>
      </div>

      {/* Skills Section with updated background */}
      <section id="skills" className="py-20" style={{ background: "linear-gradient(145deg, #0e1122, #13182b)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skills />
        </div>
      </section>

      {/* Projects Section with updated background */}
      <section id="projects" className="py-20" style={{ background: "#101524" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="dashboard" className="py-20">
          <Dashboard />
        </section>
      </div>

      {/* Certificates Section with updated background */}
      <section id="certificates" className="py-20" style={{ background: "#0c0e1a" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Certificates />
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </div>
      <Footer />
    </main>
  )
}
