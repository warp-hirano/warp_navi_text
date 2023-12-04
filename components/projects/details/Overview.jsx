import React from 'react';
import { RichText } from 'prismic-reactjs';
import { default as NextLink } from 'next/link';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Project Overview
 */
const Overview = ({ overviewTitle, overview, skills, awards, liveSite }) => {
  const title = RichText.asText(overviewTitle)
    ? RichText.asText(overviewTitle)
    : '';

  const content = RichText.asText(overview) ? RichText.asText(overview) : '';

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [refAwards, inViewAwards] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [refLink, inViewLink] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <>
      <div className="ov-title">
        <LazyMotion features={domAnimation}>
          <m.h2
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className="will-change"
          >
            {title}
          </m.h2>
        </LazyMotion>
        {skills && (
          <ul className="skills">
            {skills.map((skill, index) => (
              <LazyMotion
                features={domAnimation}
                key={`skill-${RichText.asText(skill.skill_name)}`}
              >
                <m.li
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={variants}
                  custom={index + 1}
                  className="will-change"
                >
                  {RichText.asText(skill.skill_name)}
                </m.li>
              </LazyMotion>
            ))}
          </ul>
        )}

        {liveSite.url && (
          <LazyMotion features={domAnimation}>
            <m.div
              className="live-site will-change"
              initial="hidden"
              ref={refLink}
              animate={inViewLink ? 'visible' : 'hidden'}
              variants={variants}
            >
              <NextLink href={liveSite.url} target={liveSite.target}>
                <a>View Live Site</a>
              </NextLink>
            </m.div>
          </LazyMotion>
        )}
      </div>
      {content && (
        <div className="overview" initial="hidden">
          <LazyMotion features={domAnimation}>
            <m.h3
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
              custom={skills ? skills.length + 1 : 2}
              className="will-change"
            >
              Overview
            </m.h3>
          </LazyMotion>
          <LazyMotion features={domAnimation}>
            <m.div
              className="overview-content will-change"
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
              custom={skills ? skills.length + 2 : 3}
            >
              {content}
            </m.div>
          </LazyMotion>
        </div>
      )}

      {awards[0].award_name.length ? (
        <div className="awards" ref={refAwards} initial="hidden">
          <LazyMotion features={domAnimation}>
            <m.h3
              animate={inViewAwards ? 'visible' : 'hidden'}
              variants={variants}
              className="will-change"
            >
              Awards
            </m.h3>
          </LazyMotion>
          <ul className="awards-links">
            {awards.map((award) => {
              if (award.award_link.url) {
                return (
                  <LazyMotion features={domAnimation}>
                    <m.li
                      animate={inViewAwards ? 'visible' : 'hidden'}
                      variants={variants}
                      custom={2}
                      key={`award-${RichText.asText(award.award_name)}`}
                      className="will-change"
                    >
                      <NextLink
                        href={award.award_link.url}
                        target={award.award_link.target}
                      >
                        <a>{RichText.asText(award.award_name)}</a>
                      </NextLink>
                    </m.li>
                  </LazyMotion>
                );
              }
              return '';
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Overview;
