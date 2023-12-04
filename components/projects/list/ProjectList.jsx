/* eslint-disable global-require */
import React, { useRef, useState } from 'react';
import NextLink from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from 'public/anim/hover-arrow';
import ProjectItem from './ProjectItem';

const defaultOptions = {
  loop: false,
  isStopped: false,
  isPaused: false,
  autoplay: false,
  direction: 1,
  renderer: 'svg',
  height: 110,
  width: 100,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

/**
 * Project list component
 */
const ProjectList = ({ projects, cName, more = false }) => {
  const defaultImage = require('public/images/project.webp');

  const hoverButtonRef = useRef(null);
  const allWorksRef = useRef(null);

  const [isPaused, setIsPaused] = useState(true);
  const [direction, setDirection] = useState(1);

  const bindMouseMove = (e) => {
    const y = e.clientY - allWorksRef.current.getBoundingClientRect().top + 110;

    const x =
      e.clientX - allWorksRef.current.getBoundingClientRect().left + 110;
    hoverButtonRef.current.style.top = `${y}px`;
    hoverButtonRef.current.style.left = `${x}px`;
  };

  return (
    <>
      <div className="all-works" onMouseMove={bindMouseMove} ref={allWorksRef}>
        <div
          className="hover-button"
          ref={hoverButtonRef}
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            top: 0,
            left: 0,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <Lottie
            options={defaultOptions}
            isPaused={isPaused}
            direction={direction}
            speed={2}
          />
        </div>
        <LazyMotion features={domAnimation}>
          <m.ul className={`will-change project-list ${cName.join(' ')}`}>
            {projects.map((project) => (
              <ProjectItem
                project={project}
                key={project.id}
                type={cName}
                defaultImage={defaultImage}
                setIsPaused={setIsPaused}
                setDirection={setDirection}
              />
            ))}
            {more && (
              <li>
                <NextLink href="/projects">
                  <a>More Projects</a>
                </NextLink>
              </li>
            )}
          </m.ul>
        </LazyMotion>
      </div>
    </>
  );
};

export default ProjectList;
