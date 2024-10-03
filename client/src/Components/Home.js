import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion"; // Import necessary functions
// import LibraryPage from './LibraryPage';
import About from "./About";


function Home() {
    const list = { hidden: { opacity: 0 } }
    const item = { hidden: { x: -10, opacity: 0 } }

    const x = useMotionValue(0); // Correctly use useMotionValue
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]); // Correctly use useTransform

    return (
        <div>
            <section>
                <About />
            </section>
            <image_url src="https://via.placeholder.com/150" alt="Placeholder Image" />

            {/* Motion components for animations */}
            <motion.div layout />
            <motion.div animate={{ x: 100 }} />
            <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 1.1 }} 
                drag="x" 
                dragConstraints={{ left: -100, right: 100 }}
            />
            <motion.ul animate="hidden" variants={list}>
                <motion.li variants={item} />
                <motion.li variants={item} />
                <motion.li variants={item} />
            </motion.ul>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
            <motion.div initial={false} animate={{ x: 100 }} />
            <motion.div drag="x" style={{ x, opacity }} />
            <motion.div layout />
            {/* Update this section to handle opacity change */}
            <motion.div className="boxes" animate={{ opacity: 0 }} />
        </div>
    );
}

export default Home;