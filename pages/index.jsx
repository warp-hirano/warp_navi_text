import React, { useEffect, useRef, useState } from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import Prismic from '@prismicio/client';

import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
import ProjectListFlat from 'components/projects/list/ProjectListFlat';
import BlogPostList from 'components/blogposts/BlogPostList';
import dynamic from 'next/dynamic';
import BubbleWrapper from 'components/BubbleWrapper';
import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion';

const Distortion = dynamic(() => import('components/Distortion'), {
  ssr: false,
});
/**
 * Homepage component
 */
function Homepage({ doc, menu, footer, lang, preview, projects, posts }) {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    const listWrapper = useRef(null);

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
      document.querySelector('body').classList.add('home');
      return () => {
        document.querySelector('body').classList.remove('home');
      };
    }, []);

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

        <BubbleWrapper
          imgUrl={doc.data.hero_image.url}
          imgMobileUrl={
            Object.keys(doc.data.hero_mobile_image).length > 0
              ? doc.data.hero_mobile_image.url
              : doc.data.hero_image.url
          }
          imgAlt={doc.data.hero_image.alt}
          topTitle={doc.data.top_title_top}
          bottomTitle={doc.data.top_title_bottom}
          videoUrl={doc.data.play_reel.url}
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
        />

        {projects && (
          <div
            className={`wrapper ${isVideoPlaying ? 'fade' : ''}`}
            ref={listWrapper}
            data-scroll-section
          >
            {projects && (
              <>
                <h3>Latest work</h3>
                <ProjectListFlat
                  projects={projects}
                  cName={['flat']}
                  more="true"
                  listRef={listWrapper}
                />
              </>
            )}
            {posts && (
              <>
                <h3>Latest stories</h3>
                <BlogPostList posts={posts} more />
              </>
            )}
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
      'homepage',
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

  const projects = await client.query(
    Prismic.Predicates.at('document.type', 'project'),
    {
      orderings: '[document.last_publication_date desc]',
      pageSize: 5,
      ...(ref ? { ref, lang: locale } : { lang: locale }),
    },
  );

  const posts = await client.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    {
      orderings: '[document.last_publication_date desc]',
      pageSize: 3,
      ...(ref ? { ref, lang: locale } : { lang: locale }),
    },
  );

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      menu,
      doc,
      footer,
      projects: projects ? projects.results : [],
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

export default Homepage;
