import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import { RichText } from 'prismic-reactjs';

import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
import dynamic from 'next/dynamic';
import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion';
import SkillCardSet from '../components/skills/SkillCardSet';
import Clients from '../components/Clients';

const Distortion = dynamic(() => import('components/Distortion'), {
  ssr: false,
});

/**
 * Services Page component
 */
function ServicesPage({ doc, menu, footer, lang, preview }) {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    const shouldLoadDistortion = useShouldLoadDistortion();

    const introduction =
      doc && RichText.asText(doc.data.introduction)
        ? RichText.asText(doc.data.introduction)
        : '';

    const weDoTitle =
      doc && RichText.render(doc.data.what_we_do_title)
        ? RichText.render(doc.data.what_we_do_title)
        : '';

    const weDoContent =
      doc && RichText.asText(doc.data.what_we_do)
        ? RichText.asText(doc.data.what_we_do)
        : '';

    const brandTitle =
      doc && RichText.asText(doc.data.brand_section_title)
        ? RichText.asText(doc.data.brand_section_title)
        : '';

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        title="Our awesome projects"
        isPreview={preview.isActive}
      >
        {shouldLoadDistortion && <Distortion />}
        <div className="wrapper" data-scroll-section>
          <div className="grid">
            <div className="introduction">{introduction}</div>
            {doc.data.presentation_image.url !== undefined && (
              <div
                className="presentation-image"
                style={{
                  backgroundImage: `url(${doc.data.presentation_image.url})`,
                }}
              />
            )}
          </div>

          <div id="we-do" className="grid">
            <div className="intro-title">{weDoTitle}</div>
            <div className="intro-content">{weDoContent}</div>
          </div>
        </div>

        <SkillCardSet skills={doc.data.skills} />
        <div className="wrapper" id="brands" data-scroll-section>
          <h2>{brandTitle}</h2>
          <ul className="grid">
            <Clients brands={doc.data.brand} />
          </ul>
        </div>
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
      'servicepage',
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

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      menu,
      doc,
      footer,
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

export default ServicesPage;
