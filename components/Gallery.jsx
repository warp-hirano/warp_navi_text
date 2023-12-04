import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.css';

/**
 * Blog post gallery slider
 */
const Gallery = ({ gallery, galleryName = 'gallery_image' }) => {
  const sliderConfiguration = {
    type: 'carousel',
    startAt: 0,
    gap: 30,
    perView: 2,
    focusAt: 'center',
    breakpoints: {
      768: {
        perView: 1.2,
        gap: 15,
      },
      1080: {
        perView: 1.5,
        gap: 20,
      },
    },
    // autoplay: 5000
  };

  const hasPictures =
    gallery.length > 0 && Object.entries(gallery[0][galleryName]).length;
  const slider = new Glide('.glide', sliderConfiguration);

  useEffect(() => {
    if (hasPictures) {
      slider.mount();
    }

    return () => slider.destroy();
  }, [slider]);
  return hasPictures ? (
    <div className="image-gallery" data-scroll-section>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            {gallery.map((gal) => (
              <figure key={gal[galleryName].url}>
                <img
                  src={gal[galleryName].url}
                  alt={
                    gal[galleryName].alt !== null
                      ? gal[galleryName].alt
                      : 'gallery image'
                  }
                />
                <figcaption>{gal[galleryName].alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Gallery;
