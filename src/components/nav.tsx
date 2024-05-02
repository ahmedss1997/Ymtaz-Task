import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import image from "../../public/logo.png"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [isSmallScreen]);

  const items = [
    "الرئيسية",
    "من نحن",
    "اتصل بنا",
    "الدعم الفنى",
    "أرقام التشغيل",
    "سياسة الخصوصية",
  ];

  return (
    <nav className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src={image}
            className=""
            width={140}
            height={70}
            alt="logo"
            priority
          />
        </div>

        {/* List */}
        <ul className={`hidden lg:flex text-white`} dir="rtl">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-[#2D4768] mx-4 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Bar icon */}
        <div className="flex items-center">
          {/* button on lg */}
          <button className="text-[#2D4768]">
            <FaBars className={`hidden lg:inline text-2xl cursor-pointer `} />
          </button>
          {/* button on sm */}
          <button className="text-[#2D4768]" onClick={toggleMenu}>
            <FaBars className={`lg:hidden text-2xl cursor-pointer `} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isSmallScreen && showMenu && (
        <div
          className={`lg:hidden px-3`}
          style={{ transition: "transform 0.5s ease" }}
        >
          <ul className="text-white" dir="rtl">
            {items.map((item, index) => (
              <li
                key={index}
                className="py-2 px-4 text-[#2D4768] hover:bg-slate-50 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
