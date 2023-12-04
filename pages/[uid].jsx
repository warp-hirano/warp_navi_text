import React from 'react';
import { queryRepeatableDocuments } from 'utils/queries';
import { Client, manageLocal } from 'utils/prismicHelpers';
import { pageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout } from 'components';
/**
 * posts component
 */
const Page = ({ doc, menu, lang, preview, footer }) => {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(
      pageToolbarDocs(doc.uid, preview.activeRef, doc.lang),
      [doc],
    );

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        isPreview={preview.isActive}
      />
    );
  }
  return '';
};

export async function getServerSideProps({
  preview,
  previewData,
  params,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();
  const doc =
    (await client.getByUID(
      'page',
      params.uid,
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

export async function getServerSidePaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === 'page',
  );
  return {
    paths: documents.map((doc) => ({
      params: { uid: doc.uid },
      locale: doc.lang,
    })),
    fallback: false,
  };
}

export default Page;
