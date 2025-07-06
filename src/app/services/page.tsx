import { services } from '@/lib/services/services';
import Image from 'next/image';
import Link from 'next/link';

const focusLabels: Record<string, string> = {
  web3: 'Web3 & Trust',
  ai: 'AI & Data',
  climate: 'Climate & Carbon',
  ethics: 'Privacy & Ethics',
  creative: 'Creative & Freelance',
  default: 'Strategy & Escrow',
};

const focusOrder: ('web3' | 'ai' | 'climate' | 'ethics' | 'creative' | 'default')[] = [
  'web3',
  'ai',
  'climate',
  'ethics',
  'creative',
  'default',
];

export default function ServicesPage() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-12 bg-gradient-to-br from-[#0d1117] via-[#111827] to-[#0d1117] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-14 drop-shadow-sm">
          Explore All Services by Focus Area
        </h1>

        {focusOrder.map((focus) => {
          const group = services.filter((s) => s.focus === focus);
          const preview = group.slice(0, 3); // now guaranteed to be 3

          if (!group.length) return null;

          return (
            <div key={focus} className="mb-24">
              <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-2xl font-semibold drop-shadow-md">
                  {focusLabels[focus] || focus}
                </h2>
                <Link
                  href={`/services/${focus}`}
                  className="text-sm text-white/60 hover:text-white underline transition"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {preview.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-white/20 transition group"
                  >
                    <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{service.description}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                      Explore
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

