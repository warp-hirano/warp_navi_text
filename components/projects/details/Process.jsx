import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useInView } from 'react-intersection-observer';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Project Process
 */
const Process = ({ processTitle, sectionTitle, processes }) => {
  const title = RichText.asText(processTitle)
    ? RichText.asText(processTitle)
    : '';
  const sectionName = RichText.asText(sectionTitle)
    ? RichText.asText(sectionTitle)
    : 'Process';
  const hasProcesses = processes[0].proc_title.length > 0;
  const [refTitle, inViewTitle] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [refSection, inViewSection] = useInView({
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
      <LazyMotion features={domAnimation}>
        <m.h2
          ref={refTitle}
          initial="hidden"
          animate={inViewTitle || inViewSection ? 'visible' : 'hidden'}
          variants={variants}
          custom={0}
          className="will-change"
        >
          {title}
        </m.h2>
      </LazyMotion>
      {hasProcesses && (
        <div className="processes">
          <LazyMotion features={domAnimation}>
            <m.h3
              ref={refSection}
              initial="hidden"
              animate={inViewSection ? 'visible' : 'hidden'}
              variants={variants}
              custom={1.2}
              className="will-change"
            >
              {sectionName}
            </m.h3>
          </LazyMotion>
          <ul>
            {processes.map((pro, index) => {
              const content = RichText.asText(pro.proc_title)
                ? RichText.asText(pro.proc_title)
                : '';

              const [refList, inViewList] = useInView({
                triggerOnce: true,
                threshold: 0.5,
              });

              return (
                <LazyMotion features={domAnimation} key={content}>
                  <m.li
                    className="underlined-box will-change"
                    initial="hidden"
                    ref={refList}
                    animate={inViewList ? 'visible' : 'hidden'}
                    variants={variants}
                    custom={index + 1}
                  >
                    {content}
                  </m.li>
                </LazyMotion>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Process;
