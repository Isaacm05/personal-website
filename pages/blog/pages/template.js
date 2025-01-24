import blogs from "../data/blogData";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import candid from "../../../public/candid.jpg";

export default function BlogPage() {
    const currentLink = "/blog/pages/ml";
    const recentPosts = blogs
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    const currentPost = blogs.find((blog) => blog.link === currentLink);
    const currentImage = currentPost?.image;
    const tags = currentPost?.tags;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);


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
        { name: "Blog Home", href:"/blog" },
        { name: "Portfolio", href:"../../" },
    ];

    const handleScroll = (section) => {
        // Placeholder function for scroll behavior
        console.log(`Scrolling to ${section}`);
    };

    return (
        <>
            <motion.nav
                className="w-full m-0 p-0 sticky top-0 bg-white dark:bg-black z-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "linear" }}
            >
                <div className="flex justify-between items-center px-6 py-10">
                    <h1 className="text-4xl font-bold dark:text-white transition-opacity duration-500">
                        Isaac Mei&apos;s Blog
                    </h1>
                    <ul className="hidden md:flex items-center">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="ml-6 text-1xl dark:text-white hover:underline"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
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
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl dark:text-white hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </motion.nav>

            <motion.div className="bg-white dark:bg-black py-10 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                    {/* Main Content */}
                    <div className="lg:w-3/4 pr-6">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-black dark:text-white">
                                Blog Title Here
                            </h1>
                            <h2 className={"text-lg my-2 font-semibold"}>Isaac Mei</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                October 15, 2023
                            </p>
                        </div>

                        <div className="flex flex-wrap mb-4">
                            {tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    className="text-sm bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-lg mr-2 mb-2"
                                >
                                                {tag}
                                            </span>
                            ))}
                        </div>

                        <div className="relative w-full h-72 overflow-hidden rounded-lg mb-6">
                            <Image
                                src={currentImage}
                                alt="Blog Image"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        </div>

                        <article className="prose dark:prose-invert">
                            <p>Your blog content goes here...</p>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/4 mt-10 lg:mt-0">
                        <div className="sticky top-20 space-y-6">
                            <h2 className="text-2xl font-semibold text-black dark:text-white">
                                Author
                            </h2>

                            <div className="relative w-full h-32 overflow-hidden rounded-lg mb-2">
                                <Image
                                    src={candid}
                                    alt="Isaac Mei"
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </div>

                            <p>
                                Isaac Mei is a student at Purdue University Studying Computer Engineering.
                                His interests are in ML, Control Systems, and Signal Processing.
                                He is traveling to Italy in May and will be writing about that as well.
                            </p>
                            <h2 className="text-2xl font-semibold text-black dark:text-white">
                                Recent Posts
                            </h2>
                            {recentPosts.map((post, index) => (
                                <a
                                    key={index}
                                    href={post.link}
                                    className="block p-4 bg-white-800 border-gray-400 hover:rounded-lg  hover:shadow-md hover:scale-105 transition"
                                >
                                    <div className="relative w-full h-24 overflow-hidden rounded-lg mb-2">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium text-black dark:text-white">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.date).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </aside>
                </div>
            </motion.div>
        </>
    );
}
