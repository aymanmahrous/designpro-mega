
import Navbar from "../../components/Navbar";

export default async function Page() {
  const tools = [
    { name: "Logo Generator", link: "#" },
    { name: "Image Enhancer", link: "#" },
    { name: "Background Remover", link: "#" },
    { name: "AI Image Creator", link: "#" },
    { name: "Text to Image", link: "#" },
    { name: "Image to Text", link: "#" },
    { name: "Post Designer", link: "#" },
    { name: "Video Upscaler", link: "#" },
    { name: "Content Ideas AI", link: "#" },
    { name: "Copywriting AI", link: "#" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar lang="en" />
      <div className="max-w-6xl mx-auto pt-32 px-6">
        <h1 className="text-4xl font-bold mb-6 text-primary">Design Tools</h1>
        <p className="text-lg mb-10 opacity-80">More than 70 advanced tools in one place.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <a key={i} href={tool.link} className="p-6 bg-main-gradient text-white rounded-xl shadow-lg hover:scale-105 transition">
              <h2 className="text-xl font-semibold">{tool.name}</h2>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

