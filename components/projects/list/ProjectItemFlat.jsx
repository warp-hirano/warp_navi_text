import React from 'react';
import { RichText } from 'prismic-reactjs';
import { default as NextLink } from 'next/link';
import { hrefResolver, linkResolver } from 'prismic-configuration';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Project item component
 */
const ProjectItemFlat = ({
  project,
  type,
  setHoverImage,
  showHover,
  index,
}) => {
  const title = RichText.asText(project.data.client)
    ? RichText.asText(project.data.client)
    : '';

  const style = type.includes('images')
    ? { backgroundImage: `url(${project.data.main_image.url})` }
    : {};

  let categoryName = null;

  if (project.data.category.length) {
    categoryName = RichText.asText(project.data.category)
      ? RichText.asText(project.data.category)
      : '';
  }

  const updateCurrentHover = () => {
    showHover(true);
    setHoverImage(project.data.main_image.url);
  };

  const listItem = {
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
    <LazyMotion features={domAnimation}>
      <m.li
        onMouseEnter={updateCurrentHover}
        variants={listItem}
        custom={index}
        className="will-change"
      >
        <NextLink as={linkResolver(project)} href={hrefResolver(project)}>
          <a style={style}>
            <div className="title">
              <span>{title}</span>
              {categoryName && (
                <div className="list-category">{categoryName}</div>
              )}
            </div>
          </a>
        </NextLink>
      </m.li>
    </LazyMotion>
  );
};

export default ProjectItemFlat;
