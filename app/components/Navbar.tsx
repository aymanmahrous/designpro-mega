
export default function Navbar({ lang }) {
  return (
    <nav className="w-full fixed top-0 left-0 bg-black/20 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">DesignPro Mega</div>

      <div className="flex gap-4 text-lg">
        <a
          href="/ar"
          className={lang === "ar" ? "text-secondary font-bold" : "text-white"}
        >
          AR
        </a>

        <a
          href="/en"
          className={lang === "en" ? "text-secondary font-bold" : "text-white"}
        >
          EN
        </a>
      </div>
    </nav>
  );
}

