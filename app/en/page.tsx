
import Navbar from "../components/Navbar";

export default async function Page() {
  const en = await fetch("http://localhost:3000/locales/en.json").then(r => r.json());

  return (
    <div className="min-h-screen bg-main-gradient text-white">
      <Navbar lang="en" />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <h1 className="text-4xl font-bold mb-4">{en.hero.title}</h1>
        <p className="text-lg opacity-90 mb-8">{en.hero.subtitle}</p>
        <a href="/en/tools" className="px-6 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg">
          Get Started
        </a>
      </div>
    </div>
  );
}

