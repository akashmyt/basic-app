import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    'https://via.placeholder.com/600x300/0000FF/FFFFFF?text=Image1',
    'https://via.placeholder.com/600x300/FF0000/FFFFFF?text=Image2',
    'https://via.placeholder.com/600x300/00FF00/FFFFFF?text=Image3',
  ];

  const items = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    description: `This is the description for item ${index + 1}.`,
  }));

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
        <h1>Complex Page Example</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2>Search Items</h2>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
          />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2>Image Carousel</h2>
          <div style={{ position: 'relative', width: '600px', margin: '0 auto' }}>
            <img
              src={carouselImages[currentImageIndex]}
              alt="Carousel"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              &#10095;
            </button>
          </div>
        </section>
      </main>
      <footer style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
        <p>&copy; 2023 Complex Page Example. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
