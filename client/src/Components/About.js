import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';  // Import motion from framer-motion

const About = () => {
  const [image_url, setImageUrl] = useState("");

  useEffect(() => {
    fetch("/about_image")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.image_url));
  }, []);

  // Define animation variants for the section and image
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const imageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } }
  };

  return (
    <motion.section 
      className="about"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}  // Apply the section animation
    >
      <h2>FunReadNovel</h2>
      <p>
        FunReadNovel is an interactive app that allows its users to read, select and comment on their favorite books. This platform was designed to give book lovers a deeper connection with their favorite books and authors, as well as sharing their thoughts and opinions regarding their most recent favorite book.
      </p>
      <p>
        Join our community of book lovers, authors, and commentators on FunReadNovel, where we can let our imagination run wild with our vast collection of books across many genres to choose from!
      </p>
      <div style={{ textAlign: 'center' }}>
        <h1>About</h1>
        {image_url && (
          <motion.img 
            src={image_url} 
            alt="About" 
            style={{ 
              width: '200px', // Decrease size
              height: 'auto', 
              display: 'block', 
              margin: '0 auto'  // Center the image
            }} 
            initial="hidden"
            animate="visible"
            variants={imageVariants}  // Apply image animation
          />
        )}
      </div>
    </motion.section>
  );
};

export default About;