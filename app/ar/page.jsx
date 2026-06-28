import Navbar from "../components/Navbar";
import ar from "../../public/locales/ar.json";

export default function Page() {
  return (
    <div className="min-h-screen bg-main-gradient text-white">
      <Navbar lang="ar" />
      <div className="max-w-4xl mx-auto pt-32 px-6">
        <h1 className="text-4xl font-bold mb-4">{ar.hero.title}</h1>
        <p className="text-lg opacity-90 mb-8">{ar.hero.subtitle}</p>
        <a href="/ar/tools" className="px-6 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg">
          الأدوات
        </a>
      </div>
    </div>
  );
}
