import React from 'react';
import { RichText } from 'prismic-reactjs';
import NextLink from 'next/link';
import { hrefResolver, linkResolver } from 'prismic-configuration';
import { LazyMotion, domAnimation, m } from 'framer-motion';

/**
 * Blog Post component display on blog post index
 */
const BlogPostItem = ({ post }) => {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : '';

  const category = RichText.asText(post.data.category)
    ? RichText.asText(post.data.category)
    : '';

  return (
    <NextLink as={linkResolver(post)} href={hrefResolver(post)}>
      <a className="blog-item grid">
        <LazyMotion features={domAnimation}>
          <m.img
            className="will-change"
            src={post.data.main_image.url}
            alt={title}
            layoutId={`image-${title}`}
          />
        </LazyMotion>
        <div className="blog-info">
          <LazyMotion features={domAnimation}>
            <m.h3 className="will-change" layoutId={`category-${title}`}>
              {category}
            </m.h3>
          </LazyMotion>
          <LazyMotion features={domAnimation}>
            <m.h2 className="will-change" layoutId={`title-${title}`}>
              {title}
            </m.h2>
          </LazyMotion>
        </div>
        <div className="separator" />
      </a>
    </NextLink>
  );
};

export default BlogPostItem;
