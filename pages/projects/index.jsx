import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
import ProjectList from 'components/projects/list/ProjectList';

/**
 * Projects Top component
 */
function Projects({ doc, menu, footer, lang, preview, projects }) {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    const introduction =
      doc && RichText.render(doc.data.title)
        ? RichText.render(doc.data.title)
        : '';

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        isPreview={preview.isActive}
      >
        {projects && (
          <div className="wrapper" data-scroll-section>
            <div className="grid">
              <div className="introduction list-introduction">
                {introduction}
              </div>
            </div>
            <ProjectList
              projects={projects}
              title={doc.data.title}
              cName={['images', 'grid']}
            />
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
      'projectspage',
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

export default Projects;
