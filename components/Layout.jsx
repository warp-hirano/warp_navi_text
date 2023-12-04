/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import Head from 'next/head';
import { prismicRepoName } from 'utils/prismicHelpers';
import i18n from 'utils/i18n';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRouter } from 'next/router';
import Header from './navigation/Header';
import Footer from './navigation/Footer';

const Layout = ({
  children,
  altLangs,
  lang,
  menu,
  footer,
  title = i18n[lang.currentLang.slice(0, 2)].welcome,
  description = i18n[lang.currentLang.slice(0, 2)].description,
  classValue = null,
  contentType = 'website',
  isDisplaySection = false,
  image = '/images/warp-team.jpg',
}) => {
  const containerRef = useRef(null);
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>{title} | Warp Japan VISEO</title>
        <meta
          property="og:title"
          content={`${title} | Warp Japan VISEO`}
          key="title"
        />
        <meta property="og:image" content={image} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={contentType} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@digital_tokyo" />
        <meta name="twitter:title" content={`${title} | Warp Japan VISEO`} />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://warp-kakigori.prismic.io" />
        <link
          rel="preload"
          href="https://use.typekit.net/cqb8zcm.css"
          as="style"
        />
        <script
          async
          defer
          src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicRepoName}`}
        />
        <link rel="stylesheet" href="https://use.typekit.net/zby4zve.css" />
      </Head>

      <LocomotiveScrollProvider
        options={{
          smooth: true,
        }}
        watch={[]}
        containerRef={containerRef}
        location={asPath}
        onLocationChange={(scroll) => {
          // eslint-disable-next-line implicit-arrow-linebreak
          scroll.scrollTo(0, { duration: 0, disableLerp: true });
          // eslint-disable-next-line react/jsx-curly-newline
        }}
      >
        <div data-scroll-container ref={containerRef}>
          <Header
            altLangs={altLangs}
            currentLang={lang.currentLang}
            menu={menu}
          />

          <main
            className={classValue}
            data-scroll-section={isDisplaySection ? '' : null}
          >
            {children}
          </main>

          {footer && <Footer footer={footer} />}
        </div>
      </LocomotiveScrollProvider>
    </>
  );
};
export default Layout;
