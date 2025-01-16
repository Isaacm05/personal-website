import { useState, useEffect } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NavBar({ darkMode, setDarkMode, handleScroll, activeSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        { name: "Home", type: "scroll" },
        { name: "About", type: "scroll" },
        { name: "Experience", type: "scroll" },
        { name: "Skills", type: "scroll" },
        { name: "Projects", type: "scroll" },
        { name: "Blog", type: "link", href: "/blog" }, // External page
    ];

    return (
        <motion.nav
            className="w-full m-0 p-0 sticky top-0 bg-white dark:bg-black z-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "linear" }}
        >
            <div className="flex justify-between items-center px-6 py-10">
                <h1 className="text-4xl font-bold dark:text-white transition-opacity duration-500">
                    {activeSection}
                </h1>
                <ul className="hidden md:flex items-center">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.type === "scroll" ? (
                                <button
                                    onClick={() => handleScroll(item.name.toLowerCase())}
                                    className="ml-6 text-1xl dark:text-white hover:underline"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleScroll(item.name.toLowerCase())}
                                    className="ml-6 text-1xl dark:text-white hover:underline"
                                >
                                    <a href={"../blog"}>
                                        {item.name}
                                    </a>
                                </button>
                            )}
                        </li>
                    ))}
                    <li className="ml-6">
                        <BsFillMoonStarsFill
                            onClick={() => setDarkMode(!darkMode)}
                            className="cursor-pointer text-1xl dark:text-white"
                        />
                    </li>
                </ul>
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-2xl dark:text-white focus:outline-none"
                    >
                        <HiOutlineMenu />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-12 right-6 text-3xl text-black dark:text-white focus:outline-none z-50"
                    >
                        <HiX />
                    </button>

                    {/* Menu Items */}
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className="my-4">
                                {item.type === "scroll" ? (
                                    <button
                                        onClick={() => {
                                            handleScroll(item.name.toLowerCase());
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-2xl dark:text-white hover:underline"
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link href={item.href}>
                                        <a
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl dark:text-white hover:underline"
                                        >
                                            {item.name}
                                        </a>
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className="mt-8">
                            <BsFillMoonStarsFill
                                onClick={() => setDarkMode(!darkMode)}
                                className="cursor-pointer text-3xl dark:text-white"
                            />
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
}
