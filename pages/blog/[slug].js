import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const blogs = [
    {
        title: "Understanding Machine Learning Basics",
        slug: "ml-basics",
        content: "Content of the blog post.",
    },
    {
        title: "Control Systems Simplified",
        slug: "control-systems",
        content: "Content of the blog post.",
    },
];

export default function BlogPost({ blog }) {
    const router = useRouter();

    // Handle fallback state
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    // Safeguard for undefined blog (shouldn't occur with proper getStaticProps)
    if (!blog) {
        return <div>Error: Blog not found.</div>;
    }

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
        { name: "Home", type: "link", href: "/" },
    ];

    return (
        <div className="bg-white dark:bg-black">
            <motion.nav
                className="w-full m-0 p-0 sticky top-0 bg-white dark:bg-black z-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "linear" }}
            >
                <div className="flex justify-between items-center px-6 py-10">
                    <h1 className="text-4xl font-bold dark:text-white transition-opacity duration-500">
                        Static Placeholder Text
                    </h1>
                    <ul className="hidden md:flex items-center">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.type === "link" && (
                                    <Link legacyBehavior={true} href={item.href} passHref>
                                        <span className="ml-6 text-1xl dark:text-white hover:underline cursor-pointer">
                                            {item.name}
                                        </span>
                                    </Link>
                                )}
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
                                    {item.type === "link" && (
                                        <Link href={item.href} passHref>
                                            <span
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-2xl dark:text-white hover:underline cursor-pointer"
                                            >
                                                {item.name}
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </motion.nav>

            <div className="px-6 py-10">
                <h2 className="text-3xl font-semibold dark:text-white">{blog.title}</h2>
                <p className="text-lg text-gray-800 dark:text-gray-300 leading-7 mt-4">
                    {blog.content}
                </p>
                <div className="mt-6 text-right">
                    <Link href="/" passHref>
                        <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                            Back to Home
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = blogs.map((blog) => ({
        params: { slug: blog.slug },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const blog = blogs.find((b) => b.slug === params.slug);

    // Handle blog not found
    if (!blog) {
        return { notFound: true };
    }

    return { props: { blog } };
}
