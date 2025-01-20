import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    SiCss3,
    SiHtml5,
    SiJavascript,
    SiNumpy,
    SiC,
    SiCplusplus,
    SiNextdotjs,
    SiKotlin,
    SiPandas,
    SiTensorflow,
    SiScikitlearn,
    SiPytorch,
    SiOpencv,
    SiLtspice,
    SiAutodesk,
} from "react-icons/si";
import { GiRobotGrab, GiViolin } from "react-icons/gi";
import { FaJava, FaPython, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const IconBox = ({ Icon, label }) => {
    return (
        <button className="flex flex-row items-center justify-center w-24 bg-black text-white py-2 px-2 rounded-md cursor-default dark:bg-white dark:text-black">
            {label === "C#" ? (
                <Image src={"/csharp.png"} alt={label} className="h-4 w-4" width={20} height={20} />
            ) : label === "Matlab" ? (
                <Image src={"/matlab.png"} alt={label} className="h-4 w-4" width={20} height={20} />
            ) : label === "MatPlotLib" ? (
                <Image src={"/matplotlib.png"} alt={label} className="h-4 w-4" width={20} height={20} />
            ) : (
                <Icon className="h-4 w-4" />
            )}
            <span className="text-xs pl-1">{label}</span>
        </button>
    );
};

const IconCategories = () => {
    const [scrollEnabled, setScrollEnabled] = useState(false);

    useEffect(() => {
        if (scrollEnabled) {
            document.body.classList.remove("overflow-hidden");
        } else {
            document.body.classList.add("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [scrollEnabled]);

    const categories = [
        {
            name: "Programming Languages.",
            items: [
                { Icon: FaPython, label: "Python" },
                { Icon: SiC, label: "C" },
                { Icon: SiCplusplus, label: "C++" },
                { Icon: null, label: "C#" },
                { Icon: FaJava, label: "Java" },
                { Icon: SiKotlin, label: "Kotlin" },
                { Icon: null, label: "Matlab" },
            ],
        },
        {
            name: "Machine Learning.",
            items: [
                { Icon: SiNumpy, label: "numpy" },
                { Icon: SiPandas, label: "Pandas" },
                { Icon: null, label: "MatPlotLib" },
                { Icon: SiTensorflow, label: "TensorFlow" },
                { Icon: SiScikitlearn, label: "Scikit-learn" },
                { Icon: SiPytorch, label: "PyTorch" },
                { Icon: SiOpencv, label: "OpenCV" },
            ],
        },
        {
            name: "Web Development.",
            items: [
                { Icon: SiHtml5, label: "HTML" },
                { Icon: SiCss3, label: "CSS" },
                { Icon: SiJavascript, label: "JavaScript" },
                { Icon: FaReact, label: "React" },
                { Icon: RiTailwindCssFill, label: "Tailwind" },
                { Icon: SiNextdotjs, label: "Next.js" },
            ],
        },
        {
            name: "Miscellaneous",
            items: [
                { Icon: SiLtspice, label: "LTSpice" },
                { Icon: SiAutodesk, label: "Fusion 360" },
                { Icon: GiRobotGrab, label: " KRL" },
                { Icon: GiViolin, label: "Violin" },
            ],
        },
    ];

    return (
        <motion.section
            id="skills"
            data-section="Skills."
            className="my- flex flex-col md:flex-row pb-[7.5rem] bg-white dark:bg-black"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1, ease: "linear"}}
            onAnimationComplete={() => setScrollEnabled(true)}
        >
            {/* Left section */}
            <div
                className="w-full md:w-[30%] border-2 border-black p-4 mb-8 md:mb-0 md:mr-16 mt-2 md:sticky top-4 h-fit">
                <h2 className="text-xl mb-2 text-gray-600 dark:text-gray-400">Relevant Coursework.</h2>
                <p className="text-xl text-black font-bold dark:text-white">
                    C Programming <br/><br/>
                    Python For Data Science <br/><br/>
                    Electrical Engineering Fundamentals I<br/><br/>
                    Electrical Engineering Fundamentals II<br/><br/>
                    Discrete Mathematics<br/><br/>
                    Data Structures <br/><br/>
                    Differential Equations
                </p>
            </div>

            {/* Right section with animation */}
            <div className="w-full md:w-2/3 space-y-8">
                {categories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="mb-8"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 0.3, delay: index * 0.1}}
                    >
                        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">{category.name}</h2>
                        <div
                            className="grid gap-4"
                            style={{
                                gridTemplateColumns: "repeat(auto-fit, minmax(6rem, max-content))",
                                justifyContent: "left",
                            }}
                        >
                            {category.items.map((item, idx) => (
                                <IconBox key={idx} Icon={item.Icon} label={item.label}/>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>

    );
};

export default IconCategories;
