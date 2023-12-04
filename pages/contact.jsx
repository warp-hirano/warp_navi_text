/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import { RichText } from 'prismic-reactjs';

import { Layout } from 'components';
import { SNS } from 'components/navigation/Navigation';
import i18n from 'utils/i18n';
import NextLink from 'next/link';
/**
 * Contact Page component
 */

function ContactPage({ doc, menu, lang, preview, token }) {
  if (doc && doc.data) {
    useEffect(() => {
      document.querySelector('body').classList.add('blue-theme');
      document.querySelector('body').classList.add('contact-page');

      return () => {
        document.querySelector('body').classList.remove('blue-theme');
        document.querySelector('body').classList.remove('contact-page');
      };
    }, []);

    const title =
      doc && RichText.render(doc.data.title)
        ? RichText.render(doc.data.title)
        : '';

    const currentLang = lang.currentLang.slice(0, 2);
    const translations = i18n[currentLang];

    const [query, setQuery] = useState({
      name: '',
      email: '',
      company: '',
      message: '',
    });

    const [thankYou, setThankYou] = useState(null);

    // Update inputs value
    const handleParam = () => (e) => {
      const { name } = e.target;
      const { value } = e.target;
      setQuery((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    // Form Submit function
    const formSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(query).forEach(([key, value]) => {
        formData.append(key, value);
      });

      fetch(`https://getform.io/f/${token}`, {
        method: 'POST',
        body: formData,
      }).then(() => {
        setQuery({ name: '', email: '', message: '', company: '' });
        setThankYou(translations.thankyou);
      });
    };

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        title={RichText.asText(doc.data.title)}
        isPreview={preview.isActive}
      >
        <div className="wrapper" id="contact-grid">
          <div className="grid">
            {!thankYou ? (
              <>
                <div className="introduction">
                  <div className="back-button underlined-links">
                    <NextLink href="/">
                      <a>Back</a>
                    </NextLink>
                  </div>
                  {title}
                </div>
                <form className="contact-form" onSubmit={formSubmit}>
                  {' '}
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={translations.name}
                      className="form-control"
                      value={query.name}
                      onChange={handleParam()}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={translations.email}
                      className="form-control"
                      value={query.email}
                      onChange={handleParam()}
                    />
                  </div>
                  <div>
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder={translations.company}
                      className="form-control"
                      value={query.company}
                      onChange={handleParam()}
                    />
                  </div>
                  <div>
                    <label>Message</label>
                    <textarea
                      type="text"
                      name="message"
                      rows="5"
                      cols="15"
                      required
                      placeholder={translations.inquiry}
                      className="form-control"
                      value={query.message}
                      onChange={handleParam()}
                    />
                  </div>
                  <button type="submit">{translations.send}</button>
                </form>
              </>
            ) : (
              <>
                <h2
                  className="thank-you"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: thankYou }}
                />

                <div className="thank-you-close underlined-links">
                  <NextLink href="/">
                    <a>Close</a>
                  </NextLink>
                </div>
              </>
            )}
          </div>
          <SNS links={menu.data.sns} lang={currentLang} />
        </div>
      </Layout>
    );
  }
}

export async function getStaticProps({
  preview,
  previewData,
  locale,
  locales,
}) {
  let token = process.env.GETFORM_TOKEN;
  if (token === undefined) {
    token = null;
  }

  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();
  const doc =
    (await client.getSingle(
      'contactpage',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};
  const menu =
    (await client.getSingle(
      'top_menu',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      menu,
      doc,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang: {
        currentLang,
        isMyMainLanguage,
      },
      token,
    },
  };
}

export default ContactPage;
