import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

import boost from "../../public/BOOST.png";
import pushcorp from "../../public/Push-Corp-Logo.png";
import vip from "../../public/VIP-V-type logo.png";
import purdue from "../../public/purdue.png";

const Experience = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Detect if the screen width is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Define animation variants for desktop and mobile
    const desktopVariants = {
        hidden: { opacity: 0, y: 200 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "linear" },
        },
    };

    const mobileVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: "linear" },
        },
    };

    return (
        <motion.section
            className="pb-32 bg-white dark:bg-black z-20"
            id="experience"
            data-section="Experience."
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
        >
            <p className="text-xl py-2 leading-8 text-black flex justify-center dark:text-white">
                These are my most recent experiences. Previous experiences are also located on my Linkedin and Resume.
            </p>
            <div
                className="grid gap-x-2 gap-y-4 p-4"
                style={{
                    gridTemplateColumns: "repeat(auto-fill, 300px)",
                    justifyItems: "center",
                }}
            >
                {[
                    {
                        title: "Purdue University",
                        date: "Aug 2023 - May 2027",
                        description:
                            "Working Towards: BS in Computer Engineering, Minor in Management, Concentration in AI/ML, GPA: 3.5, Undergraduate Teaching Assistant for Honors Intro to Engineering",
                        image: purdue,
                    },
                    {
                        title: "PushCorp",
                        date: "May 2024 - Aug 2024",
                        description:
                            "Automated material removal using industrial robots and force-compliant devices, streamlined shipping processes to cut turnaround times, and developed consulting videos showcasing optimized material removal settings for prospective clients.",
                        image: pushcorp,
                    },
                    {
                        title: "AI in Music",
                        date: "Aug 2023 - Feb 2024",
                        description:
                            "Developed tools to convert MusicXML, MIDI, PDF, and audio into Python code, leveraging machine learning algorithms to analyze media content and evaluate accuracy of playing. Part of Vertically Integrated Projects at Purdue.",
                        image: vip,
                    },
                    {
                        title: "Building Shining Tomorrows",
                        date: "Jun 2024 - Present",
                        description:
                            "Reached over 200+ underserved members of the local community through STEM Education, and raised over $5000 dollars and 100 meals to finance resources and materials. Also created a website to help members find resources and information.",
                        image: boost,
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-[280px] h-[600px] rounded-none py-4 text-black border-2 border-black flex flex-col items-center mx-auto dark:text-white dark:border-white"
                        viewport={{ once: true }}
                        initial="hidden"
                        whileInView="visible"
                        variants={isMobile ? mobileVariants : desktopVariants}
                    >
                        <div className="w-full">
                            <h1 className="font-bold text-1xl pb-4 px-2">{item.title}</h1>
                            <hr className="border-t-2 border-black dark:border-white" />
                        </div>
                        <div
                            className="w-full flex flex-col items-center justify-center"
                            style={{ height: "280px" }}
                        >
                            <Image
                                src={item.image}
                                className="rounded-lg object-cover"
                                layout="intrinsic"
                                width={250}
                                height={250}
                            />
                        </div>
                        <hr className="border-t-2 border-black w-full dark:border-white" />
                        <p className="text-md pt-3 px-2 leading-6 font-bold text-center">
                            {item.date}
                        </p>
                        <p className="text-md pb-3 px-2 leading-6">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Experience;
