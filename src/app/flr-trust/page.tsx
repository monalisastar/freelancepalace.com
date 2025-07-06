import Hero from './components/Hero'
import CoreServices from './components/CoreServices'
import TrustArchitecture from './components/TrustArchitecture'
import Certifications from './components/Certifications'
import Footer from './components/Footer' // ✅ NEW: Footer import

export default function FLRTrustPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />

      {/* Section 2: What is FLR Trust Labs? */}
      <section className="py-24 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">What is FLR Trust Labs?</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
          FLR Trust Labs is the compliance, security, and credibility engine behind Freelancers Palace and FLR Escrow.
          From blockchain audits to enterprise-grade dispute resolution — we build trust at both protocol and human layers.
        </p>
      </section>

      {/* Section 3: Core Services */}
      <CoreServices />

      {/* Section 4: Trust Architecture Flow */}
      <TrustArchitecture />

      {/* Section 5: Certifications */}
      <Certifications />

      {/* ✅ Global Footer */}
      <Footer />
    </main>
  )
}

