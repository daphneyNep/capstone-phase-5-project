import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion"; 
import About from "./About";
import Search from './Search';

function Home() {
    const list = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const item = { hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } };

    const x = useMotionValue(0); 
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    

    return (
        <div>
            <section>
                <About />
            </section>
            
            {/* Corrected <img> tag */}
            {/* <img src="https://via.placeholder.com/150" alt="Placeholder Image" /> */}

            {/* Motion components for animations */}
            <motion.div layout /> {/* Use layout if elements change position on the page */}
            <motion.div animate={{ x: 100 }} />
            <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 1.1 }} 
                drag="x" 
                dragConstraints={{ left: -100, right: 100 }}
            />

            {/* Animate a list */}
            {/* <motion.ul initial="hidden" animate="visible" variants={list}>
                <motion.li variants={item}>Item 1</motion.li>
                <motion.li variants={item}>Item 2</motion.li>
                <motion.li variants={item}>Item 3</motion.li>
            </motion.ul> */}

            {/* Example of fade-in on scroll */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />

            {/* Simple drag with motion values */}
            <motion.div drag="x" style={{ x, opacity }} />

            {/* Animating opacity */}
            <motion.div className="boxes" animate={{ opacity: 0 }} />
        </div>
    );
}

export default Home;