import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

const blogs = [
    {
        title: "Blog 1: Exploring Machine Learning Basics",
        slug: "ml-basics",
        date: "1/1/2025",
        content: [
            { type: "text", value: "Machine learning is transforming industries with data-driven insights." },
            {
                type: "images",
                value: [
                    "/images/ml-example1.jpg",
                    "/images/ml-example2.jpg",
                    "/images/ml-example3.jpg",
                ],
                caption: "Machine learning applications in real-world scenarios.",
            },
        ],
    },
    {
        title: "Blog 2: Control Systems Made Simple",
        slug: "blog-2",
        date: "1/1/2025",
        content: [
            { type: "text", value: "Control systems play a critical role in automation and robotics." },
            {
                type: "images",
                value: [
                    "/images/control-system1.jpg",
                    "/images/control-system2.jpg",
                ],
                caption: "PID controllers and feedback loops in action.",
            },
        ],
    },
    {
        title: "Blog 3: Advanced Robotics Design Principles",
        slug: "blog-3",
        date: "1/1/2025",
        content: [
            { type: "text", value: "Robotics design requires innovative thinking and practical engineering skills." },
            {
                type: "images",
                value: [
                    "/images/robotics1.jpg",
                    "/images/robotics2.jpg",
                    "/images/robotics3.jpg",
                ],
                caption: "Examples of advanced robotic systems.",
            },
        ],
    },
    {
        title: "Blog 4: Artificial Intelligence in Healthcare",
        slug: "blog-4",
        date: "1/1/2025",
        content: [
            { type: "text", value: "AI is revolutionizing healthcare with predictive models and precision medicine." },
            {
                type: "images",
                value: [
                    "/images/ai-healthcare1.jpg",
                    "/images/ai-healthcare2.jpg",
                ],
                caption: "How AI is used in diagnosis and treatment.",
            },
        ],
    },
    {
        title: "Blog 5: The Future of Automation",
        slug: "blog-5",
        date: "1/1/2025",
        content: [
            { type: "text", value: "Automation is shaping the future of work and manufacturing." },
            {
                type: "images",
                value: [
                    "/images/automation1.jpg",
                    "/images/automation2.jpg",
                ],
                caption: "Examples of cutting-edge automation technologies.",
            },
        ],
    },
];

export default function BlogPost({ blog, relatedBlogs = [] }) {
    const router = useRouter();
    const [visibleSlug, setVisibleSlug] = useState(blog?.slug || "");
    const blogRefs = useRef({});

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    // Safeguard for undefined blog
    if (!blog) {
        return <div>Error: Blog not found.</div>;
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSlug(entry.target.id);
                        history.replaceState(null, null, `#${entry.target.id}`);
                    }
                });
            },
            { threshold: 0.5 }
        );

        Object.values(blogRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

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
        { name: "Blog Home", type: "link", href: "/blog"  },
        { name: "Portfolio", type: "link", href: "/" },
    ];

    return (
        <div className="bg-white dark:bg-black">
            <Head>
                <title>Isaac Mei&apos;s Blog</title>
                <meta
                    name="description"
                    content="Insights into Isaac Mei's life as a Computer Engineering student at Purdue University."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {/* Blog Content */}
            <div className="px-6 py-10">
                <motion.nav
                    className="w-full m-0 p-0 sticky top-0 bg-white dark:bg-black z-50"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 1, ease: "linear"}}
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
                                <HiOutlineMenu/>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <motion.div
                            className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center z-50"
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5, ease: "easeInOut"}}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-12 right-6 text-3xl text-black dark:text-white focus:outline-none z-50"
                            >
                                <HiX/>
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
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold dark:text-white">{blog.title}</h2>
                    <div className="mt-6 space-y-6">
                        {blog.content?.map((item, index) => {
                            if (item.type === "text") {
                                return (
                                    <p
                                        key={index}
                                        className="text-lg text-gray-800 dark:text-gray-300 leading-7"
                                    >
                                        {item.value}
                                    </p>
                                );
                            } else if (item.type === "images") {
                                return (
                                    <div key={index} className="mt-6">
                                        <div
                                            className="grid gap-4"
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
                                                justifyItems: "center",
                                            }}
                                        >
                                            {item.value?.map((src, imgIndex) => (
                                                <div
                                                    key={imgIndex}
                                                    className="relative bg-gray-100 rounded shadow"
                                                    style={{
                                                        width: "200px",
                                                        height: "300px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`Image ${imgIndex + 1}`}
                                                        className="object-contain max-h-full max-w-full"
                                                        style={{
                                                            borderRadius: "8px",
                                                            display: "block",
                                                            margin: "auto",
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center">
                                            {item.caption || ""}
                                        </p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>

            {/* Related Blogs */}
            <div className="px-6 py-10">
                {relatedBlogs?.map((relatedBlog, index) => (
                    <div
                        key={relatedBlog.slug}
                        id={relatedBlog.slug}
                        ref={(el) => (blogRefs.current[relatedBlog.slug] = el)}
                        className="max-w-5xl mx-auto mt-10 border-t pt-6"
                    >
                        <h2 className="text-2xl font-semibold dark:text-white">
                            {relatedBlog.title}
                        </h2>
                        <div className="mt-4 space-y-4">
                            {relatedBlog.content?.map((item, idx) => (
                                <p
                                    key={idx}
                                    className="text-lg text-gray-800 dark:text-gray-300 leading-7"
                                >
                                    {item.value}
                                </p>
                            ))}
                        </div>
                        <Link href={`/${relatedBlog.slug}`} passHref>
                            <span
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mt-4">
                                Read More
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = blogs.map((blog) => ({
        params: {slug: blog.slug},
    }));
    return {paths, fallback: true};
}

export async function getStaticProps({params}) {
    const blog = blogs.find((b) => b.slug === params.slug);

    // Provide a default empty array for related blogs
    const relatedBlogs = blogs.filter((b) => b.slug !== params.slug) || [];

    if (!blog) {
        return {notFound: true};
    }

    return {props: {blog, relatedBlogs}};
}
