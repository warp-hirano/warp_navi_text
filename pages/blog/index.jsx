/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
import BlogPostItem from 'components/blogposts/BlogPostItem';
import dynamic from 'next/dynamic';
import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion';

const Distortion = dynamic(() => import('components/Distortion'), {
  ssr: false,
});

/**
 * BlogPosts Index component
 */
function BlogPosts({ doc, menu, footer, lang, preview, posts }) {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    const introduction =
      doc && RichText.render(doc.data.title)
        ? RichText.render(doc.data.title)
        : '';

    const shouldLoadDistortion = useShouldLoadDistortion();

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        isPreview={preview.isActive}
      >
        {shouldLoadDistortion && <Distortion />}
        {posts && (
          <div className="wrapper" data-scroll-section>
            <div className="grid">
              <div className="introduction" id="post-intro">
                <p className="bw-title">
                  Warp Japan <span>Tokyo Digital Agency</span>
                </p>
                <h1>{introduction}</h1>
              </div>
            </div>
            <ul className="blog-posts-list">
              {posts.map((post) => (
                <BlogPostItem
                  post={post}
                  key={RichText.asText(post.data.title)}
                />
              ))}
            </ul>
          </div>
        )}
      </Layout>
    );
  }
}

export async function getServerSideProps({
  preview,
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();
  const doc =
    (await client.getSingle(
      'blogpage',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};
  const menu =
    (await client.getSingle(
      'top_menu',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const footer =
    (await client.getSingle(
      'footer',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const posts = await client.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    {
      orderings: '[document.last_publication_date desc]',
      ...(ref ? { ref, lang: locale } : { lang: locale }),
    },
  );

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      menu,
      doc,
      footer,
      posts: posts ? posts.results : [],
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang: {
        currentLang,
        isMyMainLanguage,
      },
    },
  };
}

export default BlogPosts;
