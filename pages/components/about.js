import { motion } from "framer-motion";
import Image from "next/image";
import face from "../../public/face.png";

export default function About() {
    return (
        <motion.section
            className="pb-32 bg-white dark:bg-black z-20"
            id="about"
            data-section="About."
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1, ease: "linear"}}
        >
        <div className="flex flex-col items-center md:flex-row-reverse md:items-center md:justify-center gap-10">
            <div className="relative bg-transparent rounded-none w-80 h-80 overflow-hidden md:h-96 md:w-96">
                <Image src={face} alt="myface" layout="fill" objectFit="cover" objectPosition={"center 10%"}/>
            </div>

            <div className="text-center p-10 md:text-left">
                <p className="text-md py-2 leading-8 text-black dark:text-white md:text-xl max-w-2xl">
                    I am a sophomore at Purdue University studying Computer Engineering with a concentration in
                    AI/Machine Learning as well as a minor in Management. I have a strong academic record,
                    maintaining a GPA of 3.5 as an undergraduate and graduating my high school in the top 6% of my
                    class.
                    <br/>
                    <br/>I have always been interested in Engineering since I was a kid. In the 6th grade, I joined
                    a robotics team and fell in love with control systems and circuit design. I have since pursued
                    similar interests at Purdue, while picking up an interest in Machine Learning due to its
                    prevalence in software tools.
                </p>
            </div>
        </div>
        </motion.section>
    );
}
