"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { SlBriefcase } from "react-icons/sl";
import { GrDocumentText } from "react-icons/gr";
import { BsLightningCharge } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import ThemeToggle from "./themeToggle";
import Resume from "./resume";

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // 🌫 Navbar background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // detect which section is visible
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        if (window.scrollY >= offsetTop - 200) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", icon: <IoHomeOutline />, label: "Home" },
    { href: "#summary", icon: <SlBriefcase />, label: "Summary" },
    { href: "#experience", icon: <GrDocumentText />, label: "Experience" },
    { href: "#skills", icon: <BsLightningCharge />, label: "Skills" },
    { href: "#links", icon: <IoIosLink />, label: "Links" },
  ];

  return (
    <section>
      <Resume />

      <nav
        className={`fixed bottom-4 left-1/2 -translate-x-1/2
          w-[92%] sm:w-[500px] md:w-[700px]
          flex items-start md:items-center justify-around rounded-full
          px-2 py-1 z-50 transition-all duration-500
          backdrop-blur-md border border-border/30
          ${scrolled ? "bg-(--background-color)/70 shadow-lg" : "bg-transparent"}
        `}
      >
        {navItems.map(({ href, icon, label }) => {
          const id = href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col md:flex-row items-center gap-1 font-semibold  text-[20px] md:px-6 py-3 px-5 md:py-3 rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-(--primary) text-(--background-color)"
                    : "text-(--text-color)"  
                }
              `}
            >
              <span className="md:text-xl text-lg">{icon}</span>
              <span className="hidden md:inline text-sm">{label}</span>
            </Link>
          );
        })}

      </nav>
    </section>
  );
};

export default Header;
