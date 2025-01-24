import { motion } from "framer-motion";
import Image from "next/image";
import candid from "../../../public/candid.jpg";

export default function BentoBoxLayout() {
    return (
        <motion.section
            className="py-10 text-left"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                style={{
                    gridTemplateRows: "auto auto",
                    height: "100%",
                    width: "100%",
                }}
            >
                <motion.div
                    className="row-span-1 col-span-1 md:col-span-2 bg-white rounded-lg p-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                        Isaac Mei&apos;s Blog
                    </h1>
                    <p className="text-base md:text-lg text-black">
                        <br/>Hi! This is my blog, where I will be posting some insights about my journey as a Computer
                        Engineering Student at Purdue University. I am currently a sophomore, mainly interested in
                        Control Systems, Signal Processing, and Machine Learning. I will write blog posts about projects
                        I create, my daily life as a student, and other miscellaneous topics related to engineering!
                        <br/><br/> I am also traveling abroad to Italy as a Maymester this summer, and will be writing
                        updates as I learn about the renaissance to the postmodern present today and experience Italian
                        culture.
                    </p>
                    <a href={"../../"} className="text-base md:text-lg text-blue-500 py-4 hover:underline">
                        <br/>Check Out My Portfolio →
                    </a>
                </motion.div>
                <div className="row-span-1 col-span-1 relative bg-white rounded-lg">
                    <Image
                        src={candid}
                        alt="Candid image"
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        </motion.section>
    );
}
