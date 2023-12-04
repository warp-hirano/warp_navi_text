/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Layout } from 'components';
import prependDateZero from 'utils/dateHelper';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import NextLink from 'next/link';

// Post functions & styles
import { Client, manageLocal } from 'utils/prismicHelpers';
import Gallery from 'components/Gallery';
import SocialShare from 'components/SocialShare';
import dynamic from 'next/dynamic';
import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion';
import BackButton from 'components/navigation/BackButton';

const Distortion = dynamic(() => import('components/Distortion'), {
  ssr: false,
});

/**
 * Blog Post page component
 */
const Post = ({ footer, menu, lang, preview, post, baseUrl }) => {
  if (post && post.data) {
    const hasTitle = RichText.asText(post.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(post.data.title) : '';
    const lastUpdated = new Date(post.last_publication_date);

    const formattedDate = `${lastUpdated.getUTCFullYear()}.${prependDateZero(
      lastUpdated.getMonth() + 1,
    )}.${prependDateZero(lastUpdated.getDate())}`;

    const category = RichText.asText(post.data.category)
      ? RichText.asText(post.data.category)
      : '';

    const content =
      RichText.render(post.data.content).length !== 0
        ? RichText.render(post.data.content)
        : '';

    const shouldLoadDistortion = useShouldLoadDistortion();

    return (
      <Layout
        altLangs={post.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        title={title}
        isPreview={preview.isActive}
        contentType="article"
        image={post.data.main_image.url}
      >
        {shouldLoadDistortion && <Distortion />}
        <div className="wrapper" data-scroll-section>
          <div className="grid">
            <div className="introduction" id="post-intro">
              <p className="bw-title">
                Warp Japan <span>Tokyo Digital Agency</span>
              </p>
              <BackButton />
              <LazyMotion features={domAnimation}>
                <m.h1 className="will-change" layoutId={`title-${title}`}>
                  {title}
                </m.h1>
              </LazyMotion>
            </div>
          </div>
          <div id="post-details" className="grid">
            <LazyMotion features={domAnimation}>
              <m.h4 className="will-change" layoutId={`category-${title}`}>
                {category}
              </m.h4>
            </LazyMotion>
            <span>{formattedDate}</span>
            <div className="rounded-img">
              <LazyMotion features={domAnimation}>
                <m.img
                  className="will-change"
                  src={post.data.main_image.url}
                  alt={title}
                  layoutId={`image-${title}`}
                />
              </LazyMotion>
            </div>
            <div id="post-content">{content}</div>
          </div>
        </div>
        {post.data.gallery.length > 0 && (
          <Gallery gallery={post.data.gallery} />
        )}
        <SocialShare baseUrl={baseUrl} />
        <div className="wrapper grid" data-scroll-section>
          <div className="post-more underlined-links mg-bt">
            <NextLink href="/blog">
              <a>More Articles</a>
            </NextLink>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};

export async function getServerSideProps({
  params,
  preview,
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();

  const baseUrl = process.env.BASE_URL;

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

  const post =
    (await client.getByUID(
      'blog_post',
      params.uid,
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      post,
      menu,
      footer,
      lang: {
        currentLang,
        isMyMainLanguage,
      },
      baseUrl,
    },
  };
}

export default Post;
