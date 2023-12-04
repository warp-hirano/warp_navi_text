import React from 'react';
import { RichText } from 'prismic-reactjs';
import { default as NextLink } from 'next/link';
import { hrefResolver, linkResolver } from 'prismic-configuration';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

/**
 * Project item component
 */
const ProjectItem = ({ project, defaultImage, setIsPaused, setDirection }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const title = RichText.asText(project.data.client)
    ? RichText.asText(project.data.client)
    : '';

  const style =
    Object.entries(project.data.main_image).length > 0
      ? { backgroundImage: `url(${project.data.main_image.url})` }
      : { backgroundImage: `url(${defaultImage})` };

  let categoryName = null;

  if (project.data.category.length) {
    categoryName = RichText.asText(project.data.category)
      ? RichText.asText(project.data.category)
      : '';
  }

  const manageMouseLeave = () => {
    setDirection(-1);
  };

  const manageMouseEnter = () => {
    setIsPaused(false);
    setDirection(1);
  };

  return (
    <motion.li
      className="will-change"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
    >
      <NextLink as={linkResolver(project)} href={hrefResolver(project)}>
        <motion.a style={style} layoutId={title} className="will-change">
          <div className="title">
            <span>{title}</span>
            {categoryName && (
              <div className="list-category">{categoryName}</div>
            )}
          </div>
        </motion.a>
      </NextLink>
    </motion.li>
  );
};

export default ProjectItem;
