/* eslint-disable react/self-closing-comp */
import React, { useState, useRef, useEffect } from 'react';
import NextLink from 'next/link';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';
// import { useLocomotiveScroll } from 'react-locomotive-scroll';
import ProjectItemFlat from './ProjectItemFlat';

/**
 * Project list component
 */
const ProjectListFlat = ({ projects, cName, more = false, listRef = null }) => {
  const [hovered, setHovered] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const floatingImage = useRef(null);
  const [listPaddingLeft, setListPaddingLeft] = useState(0);

  useEffect(() => {
    if (floatingImage.current && hoverImage) {
      floatingImage.current.style.backgroundImage = `url(${hoverImage})`;
      floatingImage.current.classList.add('changing');
    }
  }, [hoverImage]);

  useEffect(() => {
    setListPaddingLeft(
      parseFloat(
        window
          .getComputedStyle(listRef.current)
          .getPropertyValue('padding-left')
          .replace('px', ''),
      ),
    );
  }, []);

  const showHover = () => {
    setHovered(true);
  };

  const hideHover = () => {
    if (hovered) {
      setHovered(false);
    }
  };

  const bindMouseMove = (e) => {
    if (floatingImage.current) {
      const y = e.clientY - listRef.current.getBoundingClientRect().top - 86;
      const x =
        e.clientX -
        listRef.current.getBoundingClientRect().left -
        listPaddingLeft;

      floatingImage.current.style.top = `${y}px`;
      floatingImage.current.style.left = `${x}px`;
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.3,
      },
    }),
  };

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.ul
          className={`will-change project-list ${cName.join(' ')} ${
            hovered ? 'hovered' : ''
          }`}
          onMouseMove={bindMouseMove}
          onMouseLeave={hideHover}
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={container}
        >
          {cName.includes('flat') && <i ref={floatingImage}></i>}

          {projects.map((project, index) => (
            <ProjectItemFlat
              project={project}
              key={project.id}
              type={cName}
              setHoverImage={setHoverImage}
              showHover={showHover}
              index={index}
            />
          ))}
          {more && (
            <LazyMotion features={domAnimation}>
              <m.li className="will-change" variants={container} custom={6}>
                <NextLink href="/projects">
                  <a>More Projects</a>
                </NextLink>
              </m.li>
            </LazyMotion>
          )}
        </m.ul>
      </LazyMotion>
    </>
  );
};

export default ProjectListFlat;
