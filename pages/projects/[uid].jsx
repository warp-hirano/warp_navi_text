import React, { useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import { Layout } from 'components';
import Prismic from '@prismicio/client';
import { getNextProject } from 'utils/projectHelper';

import { queryRepeatableDocuments } from 'utils/queries';

// Project functions & styles
import { Client, manageLocal } from 'utils/prismicHelpers';
import IntroImage from 'components/projects/details/IntroImage';
import Intro from 'components/projects/details/Intro';
import Video from 'components/Video';
import Overview from 'components/projects/details/Overview';
import DesktopSlider from 'components/projects/details/DesktopSlider';
import ResponsiveImages from 'components/projects/details/ResponsiveImages';
import Process from 'components/projects/details/Process';
import Result from 'components/projects/details/Result';
import NextProject from 'components/projects/details/NextProject';
import useMediaQuery from 'utils/hooks/useMediaQuery';

/**
 * Project page component
 */
const Project = ({ footer, menu, lang, preview, project, projects }) => {
  if (project && project.data) {
    const hasTitle = RichText.asText(project.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(project.data.title) : '';

    const theme =
      project.data.font_theme === false ? 'light-theme' : 'dark-theme';

    const responsiveImagesSet1 =
      project.data.responsive_images.length > 1
        ? project.data.responsive_images.slice(0, 3)
        : null;

    const responsiveImagesSet2 =
      project.data.responsive_images.length > 4
        ? project.data.responsive_images.slice(3, 6)
        : null;

    const nextProject = getNextProject(project.id, projects.results);

    const isBreakpoint = useMediaQuery(768);

    useEffect(() => {
      document.querySelector('body').style.backgroundColor = project.data.color;
      document.querySelector('body').classList.add(theme);
      return () => {
        document.querySelector('body').style.backgroundColor = null;
        document.querySelector('body').classList.remove(theme);
      };
    }, [theme]);

    return (
      <Layout
        altLangs={project.alternate_languages}
        lang={lang}
        menu={menu}
        footer={footer}
        title={title}
        isPreview={preview.isActive}
        contentType="article"
        image={project.data.main_image.url}
        description={
          RichText.asText(project.data.overview)
            ? RichText.asText(project.data.overview)
            : null
        }
        classValue="portfolio"
        isDisplaySection
      >
        {project.data.main_image && (
          <div className="wrapper grid" id="pf-intro-image">
            <IntroImage
              image={project.data.main_image.url}
              client={project.data.client}
            />
          </div>
        )}

        <div className="wrapper grid" id="pf-intro">
          <Intro
            title={title}
            client={project.data.client}
            category={project.data.category}
          />
        </div>

        <div className="wrapper grid" id="pf-video">
          <Video
            thumbnail={
              project.data.video_source_thumbnail
                ? project.data.video_source_thumbnail.url
                : project.data.main_image.url
            }
            isBreakpoint={isBreakpoint}
            videoSource={project.data.video_source}
          />
        </div>

        <div className="wrapper grid" id="pf-overview">
          <Overview
            overviewTitle={project.data.overview_title}
            overview={project.data.overview}
            liveSite={project.data.live_site}
            awards={project.data.awards}
            skills={project.data.skills}
          />
        </div>
        {project.data.desktop_images && (
          <DesktopSlider gallery={project.data.desktop_images} />
        )}
        {responsiveImagesSet1 && (
          <>
            <h3 className="pf-resp-title">Responsive</h3>
            <div className="wrapper grid pf-resp-img">
              <ResponsiveImages images={responsiveImagesSet1} />
            </div>
          </>
        )}

        <div className="wrapper grid" id="pf-video">
          <Video
            thumbnail={
              project.data.second_video_source_thumbnail
                ? project.data.second_video_source_thumbnail.url
                : project.data.main_image.url
            }
            isBreakpoint={isBreakpoint}
            videoSource={project.data.second_video_source}
          />
        </div>

        {project.data.process_title.length > 0 && (
          <div className="wrapper grid" id="pf-process">
            <Process
              processTitle={project.data.process_title}
              processes={project.data.processes}
              sectionTitle={project.data.section_title}
            />
          </div>
        )}

        {responsiveImagesSet2 && (
          <>
            <h3 className="pf-resp-title">Responsive</h3>
            <div className="wrapper grid pf-resp-img">
              <ResponsiveImages images={responsiveImagesSet2} />
            </div>
          </>
        )}

        {project.data.result.length > 0 && (
          <div id="pf-result">
            <Result content={project.data.result} />
          </div>
        )}

        {nextProject && (
          <div className="wrapper grid" id="pf-next-project">
            <NextProject project={nextProject} />
          </div>
        )}
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

  const project =
    (await client.getByUID(
      'project',
      params.uid,
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const projects = await client.query(
    Prismic.Predicates.at('document.type', 'project'),
    {
      orderings: '[my.case.project desc]',
      ...(ref ? { ref, lang: locale } : { lang: locale }),
    },
  );

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      project,
      projects,
      menu,
      footer,
      lang: {
        currentLang,
        isMyMainLanguage,
      },
    },
  };
}

export async function getServerSidePath() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === 'project',
  );

  return {
    paths: documents.map((doc) => `/projects/${doc.uid}`),
    fallback: true,
  };
}

export default Project;
