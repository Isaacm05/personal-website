import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import BentoBoxLayout from "@/pages/blog/components/hero";
import blogs from "./data/blogData";


export default function BlogHome() {

    const [selectedTag, setSelectedTag] = useState(null);
    const [isGridView, setIsGridView] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [sortOrder, setSortOrder] = useState("latest");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth < 768;
            setIsMobile(mobileView);
            setIsGridView(!mobileView);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredBlogs = blogs
        .filter((blog) => (selectedTag ? blog.tags.includes(selectedTag) : true))
        .sort((a, b) =>
            sortOrder === "latest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

    return (
        <motion.div className="bg-white dark:bg-black min-h-screen py-10 px-6">
            <BentoBoxLayout />

            {/* Tag Bar with Sort Dropdown */}
            <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2 mb-6">
                {/* Tag Bar or Dropdown */}
                {isMobile ? (
                    <div className="relative">
                        <motion.button
                            onClick={() => setIsTagDropdownOpen((prev) => !prev)}
                            className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg text-black dark:text-white"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                        >
                            <span>{selectedTag || "All Tags"}</span>
                            <motion.span
                                animate={{rotate: isTagDropdownOpen ? 180 : 0}}
                                transition={{duration: 0.3}}
                                className="ml-2"
                            >
                                <IoIosArrowDown/>
                            </motion.span>
                        </motion.button>

                        {isTagDropdownOpen && (
                            <motion.div
                                className="absolute left-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10"
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                            >
                                <ul className="py-2">
                                    <li>
                                        <button
                                            onClick={() => {
                                                setSelectedTag(null);
                                                setIsTagDropdownOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 text-left ${
                                                !selectedTag && "font-bold"
                                            }`}
                                        >
                                            View All
                                        </button>
                                    </li>
                                    {allTags.map((tag, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    setSelectedTag(tag);
                                                    setIsTagDropdownOpen(false);
                                                }}
                                                className={`block w-full px-4 py-2 text-left ${
                                                    selectedTag === tag && "font-bold"
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`text-lg font-medium ${
                                !selectedTag
                                    ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                                    : "text-gray-500 dark:text-gray-400"
                            }`}
                        >
                            View All
                        </button>
                        {allTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTag(tag)}
                                className={`text-lg font-medium ${
                                    selectedTag === tag
                                        ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                                        : "text-gray-500 dark:text-gray-400"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Sort Dropdown */}
                <div className="relative">
                    <motion.button
                        onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                        className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg text-black dark:text-white"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <span>Sort: {sortOrder === "latest" ? "Latest" : "Oldest"}</span>
                        <motion.span
                            animate={{rotate: isSortDropdownOpen ? 180 : 0}}
                            transition={{duration: 0.3}}
                            className="ml-2"
                        >
                            <IoIosArrowDown/>
                        </motion.span>
                    </motion.button>

                    {isSortDropdownOpen && (
                        <motion.div
                            className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.3}}
                        >
                            <ul className="py-2">
                                <li>
                                    <button
                                        onClick={() => {
                                            setSortOrder("latest");
                                            setIsSortDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left ${
                                            sortOrder === "latest" && "font-bold"
                                        }`}
                                    >
                                        Latest
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setSortOrder("oldest");
                                            setIsSortDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left ${
                                            sortOrder === "oldest" && "font-bold"
                                        }`}
                                    >
                                        Oldest
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.section
                    key={`${selectedTag}-${sortOrder}-${isGridView}`}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.5}}
                    className={`${
                        isGridView
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            : "space-y-6"
                    }`}
                >
                    {filteredBlogs.map((blog, index) => (
                        <a href={blog.link}>
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                whileHover={{scale: 1.05}}
                                transition={{duration: 0.3}}
                                className={'${isGridView ? "shadow-none rounded-none border-b border-gray-400" : "shadow-lg rounded-lg "} bg-white dark:bg-gray-800 overflow-hidden '}
                            >
                                {isGridView && (
                                    <div className="relative w-full h-72 overflow-hidden">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-black dark:text-white hover:underline">
                                        {blog.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {new Date(blog.date).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400 mt-2">
                                        {blog.description}
                                    </p>
                                    <div className="flex flex-wrap mt-4">
                                        {blog.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="text-sm bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-lg mr-2 mb-2"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span
                                        className="text-blue-500 dark:text-blue-400 mt-4 inline-block hover:underline"
                                    >
                                        Read More →
                                    </span>
                                </div>
                            </motion.div>
                        </a>
                    ))}
                </motion.section>
            </AnimatePresence>
        </motion.div>
    );
}
