import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import { RichText } from 'prismic-reactjs';

import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion';
import dynamic from 'next/dynamic';
import Gallery from 'components/Gallery';
import TeamCardSet from '../components/team/TeamCardSet';

const Distortion = dynamic(() => import('components/Distortion'), {
  ssr: false,
});

/**
 * About Page component
 */
function AboutPage({ doc, menu, footer, lang, preview }) {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    const shouldLoadDistortion = useShouldLoadDistortion();

    const title =
      doc && RichText.render(doc.data.title)
        ? RichText.render(doc.data.title)
        : '';

    const cultureTitle =
      doc && RichText.render(doc.data.culture_title)
        ? RichText.render(doc.data.culture_title)
        : '';

    const cultureDescription =
      doc && RichText.asText(doc.data.culture_text)
        ? RichText.asText(doc.data.culture_text)
        : '';

    const teamTitle =
      doc && RichText.render(doc.data.team_title)
        ? RichText.render(doc.data.team_title)
        : '';

    const officeTitle =
      doc && RichText.asText(doc.data.office_title)
        ? RichText.asText(doc.data.office_title)
        : '';

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        title="About our team"
        isPreview={preview.isActive}
      >
        {shouldLoadDistortion && <Distortion />}
        <div className="wrapper" data-scroll-section>
          <div className="grid">
            <div className="introduction">{title}</div>
            {doc.data.presentation_image !== undefined &&
              doc.data.presentation_image.url !== undefined && (
                <div
                  className="presentation-image"
                  style={{
                    backgroundImage: `url(${doc.data.presentation_image.url})`,
                  }}
                />
                // eslint-disable-next-line indent
              )}
          </div>
          <div className="grid" id="about-culture">
            <div className="intro-title">{cultureTitle}</div>
            <div className="intro-content">{cultureDescription}</div>
          </div>
          <div id="our-team">
            <div id="team-title">{teamTitle}</div>
            <div id="team">
              <TeamCardSet members={doc.data.team_member} />
            </div>
          </div>
          <div id="office" className="grid">
            <h2>{officeTitle}</h2>
          </div>
        </div>

        {doc.data.office_images.length > 0 && (
          <Gallery
            gallery={doc.data.office_images}
            galleryName="office_image"
          />
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
      'aboutpage',
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

export default AboutPage;
