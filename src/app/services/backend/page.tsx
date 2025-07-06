import Image from 'next/image';
import Link from 'next/link';

export default function BackendDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10 md:px-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-indigo-700">🛠️ Backend Development</h1>
        <p className="text-lg text-gray-600">
          Power your apps with secure, scalable, and performant backend systems. Our freelance backend engineers
          specialize in RESTful APIs, databases, microservices, and Web3 infrastructure.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/images/backend.jpeg"
            alt="Backend Development"
            width={500}
            height={400}
            className="rounded-lg shadow-md"
          />

          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">What Our Backend Developers Offer</h2>
            <li>API design and development (REST & GraphQL)</li>
            <li>Node.js, Python, Go, PHP, Java</li>
            <li>Database architecture (PostgreSQL, MongoDB, MySQL)</li>
            <li>Authentication, authorization & security</li>
            <li>Smart contract integration (Web3, Solidity)</li>
          </ul>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">💬 What Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
              “We had a tight deadline to launch a decentralized backend. The freelancer nailed it — super smooth
              integration with our smart contract.” <br />
              <span className="text-sm text-indigo-600">— Brenda K., DeFi Platform CTO</span>
            </blockquote>

            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
              “Structured, scalable, and documented APIs. We scaled from 100 users to 10,000+ in weeks.” <br />
              <span className="text-sm text-indigo-600">— Omar A., Product Owner</span>
            </blockquote>
          </div>
        </section>

        <div className="flex space-x-4 pt-4">
          <Link href="/hire">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
              Hire a Backend Dev
            </button>
          </Link>
          <Link href="/apply">
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg font-medium">
              Apply as Freelancer
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}


