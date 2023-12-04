import React, { useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.css';

const sliderConfiguration = {
  type: 'carousel',
  startAt: 0,
  gap: 30,
  perView: 1.7,
  breakpoints: {
    768: {
      perView: 1.3,
      gap: 15,
    },
  },
};

function SkillCard({ skill }) {
  const title =
    skill && RichText.asText(skill.skill_title)
      ? RichText.asText(skill.skill_title)
      : '';

  const flattenTitle = title.replace(/ /g, '').replace(/&/g, '').toLowerCase();

  useEffect(() => {
    const sliderEl = document.querySelector(`.glide-${flattenTitle}`);

    const slider = new Glide(sliderEl, sliderConfiguration);
    slider.mount();

    return () => {
      slider.destroy();
    };
  }, []);

  if (skill) {
    return (
      <li className="skill grid">
        <h4>{title}</h4>
        {skill.skill_list && (
          <ul className="skill-details">
            {skill.skill_list.map((l) => (
              <li key={l.text}>{l.text}</li>
            ))}
          </ul>
        )}
        <div className="skill-images">
          <div className={`glide glide-${flattenTitle}`}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <img
                  src={skill.skill_image_1.url}
                  alt={skill.skill_image_1.alt}
                />
                <img
                  src={skill.skill_image_2.url}
                  alt={skill.skill_image_2.alt}
                />
              </ul>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default SkillCard;
