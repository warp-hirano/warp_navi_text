import React from 'react';
import { RichText } from 'prismic-reactjs';
import { default as NextLink } from 'next/link';
import { hrefResolver, linkResolver } from 'prismic-configuration';

/**
 * Displays next project link
 */
const NextProject = ({ project }) => {
  if (project !== null) {
    return (
      <>
        <div className="next-our-works">
          <NextLink href="/projects">
            <a className="underlined-box">See all works</a>
          </NextLink>
        </div>
        <div className="next-project-link">
          <h3 className="">Next Project</h3>
          <NextLink as={linkResolver(project)} href={hrefResolver(project)}>
            <a className="underlined-box">
              {RichText.asText(project.data.client)}
            </a>
          </NextLink>
        </div>
      </>
    );
  }
  return '';
};

export default NextProject;
