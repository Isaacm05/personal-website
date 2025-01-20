import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <motion.section
                className="flex flex-col mb-2 items-center bg-white text-black dark:bg-black dark:text-white"
                data-section="Isaac Mei."
                id="home"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 1, ease: "linear"}}
            >
                <div className="text-center p-10">
                    <h2 className="text-5xl py-2 font-bold"><br/><br/>Isaac Mei</h2>
                    <h3 className="text-2xl py-2 md:text-3xl">
                        Computer Engineering @ Purdue University.
                    </h3>
                    <p className="text-md py-2 leading-8 md:text-xl max-w-lg mx-auto">
                        Welcome! I&apos;m Isaac, a sophomore at Purdue University from Dallas, Texas. I enjoy exploring
                        Machine Learning, Control Systems, Signal Processing, and Circuit Design. Check out my projects
                        and
                        blog!
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                    <a
                        className="px-4 py-2 bg-black text-white font-semibold border border-black transition-transform transform hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:border-white flex items-center gap-2"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume <FiExternalLink className="text-lg"/>
                    </a>
                    <a
                        className="px-4 py-2 bg-black text-white font-semibold border border-black transition-transform transform hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:border-white flex items-center gap-2"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Linkedin <FiExternalLink className="text-lg"/>
                    </a>
                    <a
                        className="px-4 py-2 bg-black text-white font-semibold border border-black transition-transform transform hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:border-white flex items-center gap-2"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github <FiExternalLink className="text-lg"/>
                    </a>
                    <a
                        className="px-4 py-2 bg-black text-white font-semibold border border-black transition-transform transform hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:border-white flex items-center gap-2"
                        href="../blog"
                    >
                        Blog
                    </a>
                </div>

            </motion.section>
        </>
    );
}
