import React, { useEffect, useState } from 'react';

const About = () => {
  const [image_url, setImageUrl] = useState("");

  useEffect(() => {
    fetch("/about_image")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.image_url));
  }, []);

  return (
    <section className="about">
      <h2>FunReadNovel</h2>
      <p>
        FunReadNovel is an interactive web novel app that allows users to read, select books, comment on, and rate books while providing insights into their impact and popularity. This platform is designed to give book lovers a deeper connection with their favorite books and authors. Users can share their thoughts and opinions regarding their booklist.
      </p>
      <p>
        Join our community of book lovers, authors, and commentators on FunReadNovel, where we can let our imagination run wild with our vast collection of books across many genres to choose from!
      </p>
      <div style={{ textAlign: 'center' }}>
        <h1>About</h1>
        {image_url && (
          <img 
            src={image_url} 
            alt="About" 
            style={{ 
              width: '200px', // Decrease size
              height: 'auto', 
              display: 'block', 
              margin: '0 auto'  // Center the image
            }} 
          />
        )}
      </div>
    </section>
  );
};

export default About;