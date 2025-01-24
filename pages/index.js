import { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import IconCategories from "./components/skills";
import Head from "next/head";
import { SpeedInsights } from '@vercel/speed-insights/next';


export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState("Isaac Mei.");

    // Toggle dark mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // Scroll-based active section tracking
    const handleScroll = (targetSectionId = null) => {
        const navbarHeight = document.querySelector("nav")?.offsetHeight + 50 || 0;
        const sections = document.querySelectorAll("section");

        let currentSection = "Hero.";
        let maxVisibility = 0;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const visibility =
                Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) /
                window.innerHeight;

            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                currentSection = section.getAttribute("data-section");
            }
        });

        setActiveSection(currentSection);

        if (targetSectionId) {
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                const top = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }
    };


    // Attach scroll listener
    useEffect(() => {
        const onScroll = () => handleScroll();
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <>
            <head>
                <title>Isaac Mei&apos;s Portfolio</title>
                <meta name="description" content="Portfolio website" />
                <link rel="icon" href="/favicon.png" />
            </head>

            <NavBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                handleScroll={handleScroll}
                activeSection={activeSection}
                className="dark:bg-black"
            />

            <main className="bg-white dark:bg-black px-10 md:px-20 lg:px-40">
                <Hero />
                <About />
                <div className={"px-1"}><Experience /></div>
                <IconCategories />
                <Projects />
                <SpeedInsights />
            </main>
        </>
    );
}
