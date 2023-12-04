import React from 'react';
import { RichText } from 'prismic-reactjs';
import NextLink from 'next/link';
import { hrefResolver, linkResolver } from 'prismic-configuration';

/**
 * Blog list component
 */
const BlogPostList = ({ posts }) => (
  <>
    {posts && (
      <div className="grid posts">
        <ul className="post-categories">
          {posts.map((post) => (
            <li key={post.uid}>
              <div className="post-category">
                {RichText.asText(post.data.category)
                  ? RichText.asText(post.data.category)
                  : ''}
              </div>
            </li>
          ))}
        </ul>
        <ul className="post-titles">
          {posts.map((post) => (
            <li
              key={`post-title${post.uid}`}
              className="post-title underlined-box"
            >
              <div className="post-category">
                {RichText.asText(post.data.category)
                  ? RichText.asText(post.data.category)
                  : ''}
              </div>
              <NextLink as={linkResolver(post)} href={hrefResolver(post)}>
                <a>{RichText.asText(post.data.title)}</a>
              </NextLink>
            </li>
          ))}
        </ul>
        <div className="post-more underlined-links">
          <NextLink href="/blog">
            <a>More Articles</a>
          </NextLink>
        </div>
      </div>
    )}
  </>
);

export default BlogPostList;
