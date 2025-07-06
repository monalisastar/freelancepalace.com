export default function Opportunities() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-2">🚀 Freelance Opportunities</h1>
          <p className="text-gray-600 text-lg">
            Choose from top service categories and start earning $FLR rewards.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              title: "Graphic Design",
              icon: "🎨",
              desc: "Create logos, banners, illustrations and more for clients worldwide."
            },
            {
              title: "Web Development",
              icon: "💻",
              desc: "Build responsive, high-performance websites with modern frameworks."
            },
            {
              title: "Full-stack Dev",
              icon: "🧠",
              desc: "Manage backend + frontend with full project ownership and blockchain logic."
            },
            {
              title: "Programming (Backend)",
              icon: "⚙️",
              desc: "Smart contracts, APIs, bots and everything behind the scenes."
            },
            {
              title: "UI/UX Design",
              icon: "🖌️",
              desc: "Design beautiful interfaces and improve user experience flows."
            },
            {
              title: "Mobile App Dev",
              icon: "📱",
              desc: "Create mobile-first solutions in Flutter, React Native and native stacks."
            },
            {
              title: "Anime/Art/Character Design",
              icon: "🎭",
              desc: "Draw characters, avatars, mascots or scenes for games and media."
            },
            {
              title: "Content & Copywriting",
              icon: "📝",
              desc: "Engage audiences with powerful storytelling, blogs, and SEO content."
            },
            {
              title: "Video Editing",
              icon: "🎬",
              desc: "Craft engaging reels, promos, and edit long-form content for creators."
            },
            {
              title: "Marketing (SEO, Social Media)",
              icon: "📢",
              desc: "Promote products/services, run ads, and grow brands on socials."
            },
          ].map((job, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition">
              <div className="text-4xl mb-3">{job.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
              <p className="text-gray-600">{job.desc}</p>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}


