import { motion } from "framer-motion";
import Image from "next/image";
import web1 from "../../public/web1.png";
import web2 from "../../public/web2.png";
import web3 from "../../public/web3.png";
import web4 from "../../public/web4.png";
import web5 from "../../public/web5.png";
import web6 from "../../public/web6.png";

export default function Projects() {
    const projects = [
        { src: web1, alt: "Project 1", description: "Description of Project 1", link: "#" },
        { src: web2, alt: "Project 2", description: "Description of Project 2", link: "#" },
        { src: web3, alt: "Project 3", description: "Description of Project 3", link: "#" },
        { src: web4, alt: "Project 4", description: "Description of Project 4", link: "#" },
        { src: web5, alt: "Project 5", description: "Description of Project 5", link: "#" },
        { src: web6, alt: "Project 6", description: "Description of Project 6", link: "#" },
    ];

    return (
        <motion.section
            id="projects"
            data-section="Projects."
            className="flex flex-col items-center justify-center text-center dark:bg-black overflow-x-hidden px-4"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1, ease: "linear"}}
        >
            <div className="w-full max-w-6xl mx-auto">
                <p className="text-xl py-4 leading-8 text-black dark:text-white">
                    Here are some of my projects! Hover over each one to see more details, and find the links to
                    the blog page or example. More projects to come in the future!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 w-full items-center">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="relative group transform transition duration-300 hover:scale-105"
                        >
                            <div className="relative w-full h-64">
                                <Image
                                    src={project.src}
                                    alt={project.alt}
                                    className="rounded-lg object-cover"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                                >
                                    <p className="text-white text-lg mb-4">{project.description}</p>
                                    <div className="flex gap-4">
                                        <a
                                            href={project.link}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            View Project
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                        >
                                            Blog Post
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
