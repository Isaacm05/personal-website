import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io";



export default function BlogHome() {
    const blogs = [
        {
            title: "Understanding Machine Learning Basics",
            description: "A beginner's guide to machine learning concepts and applications.",
            image: "/ml-basics.jpg",
            link: "/blog/ml-basics",
            tags: ["Machine Learning", "AI", "Basics"],
            date: "2023-10-15",
        },
        {
            title: "Control Systems Simplified",
            description: "Exploring the fundamental principles of control systems.",
            image: "/control-systems.jpg",
            link: "/blog/control-systems",
            tags: ["Control Systems", "Engineering"],
            date: "2023-09-20",
        },
        {
            title: "Top 5 Circuit Design Tools",
            description: "A review of the best tools for circuit design and simulation.",
            image: "/circuit-tools.jpg",
            link: "/blog/circuit-tools",
            tags: ["Circuit Design", "Tools", "Engineering"],
            date: "2023-10-01",
        },
    ];

    const [selectedTag, setSelectedTag] = useState(null);
    const [isGridView, setIsGridView] = useState(true); // Default to grid view
    const [isMobile, setIsMobile] = useState(false); // Track mobile state
    const [sortOrder, setSortOrder] = useState("latest"); // Default to sorting by latest
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

    // Detect mobile devices and enforce list view
    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth < 768;
            setIsMobile(mobileView);
            setIsGridView(!mobileView); // Set to list view if on mobile
        };

        handleResize(); // Run on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Filter and Sort Blogs
    const filteredBlogs = blogs
        .filter((blog) => (selectedTag ? blog.tags.includes(selectedTag) : true))
        .sort((a, b) =>
            sortOrder === "latest"
                ? new Date(b.date) - new Date(a.date) // Most recent first
                : new Date(a.date) - new Date(b.date) // Oldest first
        );

    return (
        <motion.div className="bg-white dark:bg-black min-h-screen py-10 px-6">
            {/* Hero Section */}
            <motion.section
                className="py-10 text-left" // Replace text-center with text-left
                initial={{y: -50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <h1 className="text-5xl font-bold text-black dark:text-white">
                    Isaac Mei&apos;s Blog
                </h1>
                <p className="text-xl mt-4 text-gray-600 dark:text-gray-300 max-w-3xl">
                    Some insight into my life as a second-year college student at Purdue University studying Computer
                    Engineering.
                </p>
            </motion.section>


            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap items-center justify-end mb-6">
                <div className="relative">
                    {/* Dropdown Filter Button */}
                    <motion.button
                        onClick={() => setIsTagDropdownOpen((prev) => !prev)} // Toggle dropdown
                        className="flex justify-end items-center w-36 py-2 text-black dark:text-white rounded-lg bg-white dark:bg-black hover:underline"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <span className="text-right">{selectedTag ? selectedTag : "All Tags"}</span>
                        <motion.span
                            animate={{rotate: isTagDropdownOpen ? 180 : 0}}
                            transition={{duration: 0.3}}
                            className="ml-2 text-sm"
                        >
                            <IoIosArrowDown/>
                        </motion.span>
                    </motion.button>

                    {/* Dropdown Menu */}
                    {isTagDropdownOpen && (
                        <motion.div
                            className="absolute text-right right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.3}}
                        >
                            <ul className="py-2">
                                <li>
                                    <button
                                        onClick={() => {
                                            setSelectedTag(null); // Reset to "All Tags"
                                            setIsTagDropdownOpen(false); // Close dropdown
                                        }}
                                        className={`block w-full px-4 py-2 text-gray-700 text-right hover:underline ${
                                            !selectedTag && "font-bold"
                                        }`}
                                    >
                                        All Tags
                                    </button>
                                </li>
                                {allTags.map((tag, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => {
                                                setSelectedTag(tag); // Set selected tag
                                                setIsTagDropdownOpen(false); // Close dropdown
                                            }}
                                            className={`block w-full px-4 py-2 text-gray-700 text-right hover:underline ${
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


                {/* Sort Dropdown */}
                <div className="relative">
                    {/* Sort Button */}
                    <motion.button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="flex items-center px-4 py-2 dark:bg-gray-700 text-black "
                    >
                        <span>Sort</span>
                        <motion.span
                            animate={{rotate: isDropdownOpen ? 180 : 0}}
                            transition={{duration: 0.3}}
                            className="ml-2 text-sm"
                        >
                            <IoIosArrowDown/>
                        </motion.span>
                    </motion.button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
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
                                            setSortOrder("latest");
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                            sortOrder === "latest" && "font-bold"
                                        }`}
                                    >
                                        Sort by Latest
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setSortOrder("oldest");
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                            sortOrder === "oldest" && "font-bold"
                                        }`}
                                    >
                                        Sort by Oldest
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </div>

                {!isMobile && (
                    <motion.button
                        onClick={() => setIsGridView(!isGridView)}
                        className="px-2 py-2 bg-white rounded-lg hover:bg-gray-100"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                    >
                        {isGridView ? <FaListUl/> : <BsFillGridFill/>}
                    </motion.button>
                )}
            </div>

            {/* Blog Posts */}
            <AnimatePresence mode="wait">
                <motion.section
                    key={`${selectedTag}-${sortOrder}-${isGridView}`} // Ensures animation on state change
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className={`${
                        isGridView
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            : "space-y-6"
                    }`}
                >
                    {filteredBlogs.map((blog, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }} // Add scaling effect on hover
                            transition={{ duration: 0.3 }}
                            className={`${
                                isGridView
                                    ? "bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                                    : "bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6"
                            }`}
                        >
                            {/* Conditionally Render Image for Grid View */}
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

                            {/* Blog Content */}
                            <div className="mx-5 my-5">
                                <h2 className="text-2xl font-semibold text-black dark:text-white">
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
                                <a
                                    href={blog.link}
                                    className="text-blue-500 dark:text-blue-400 mt-4 inline-block hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.section>
            </AnimatePresence>

        </motion.div>
    );
}
