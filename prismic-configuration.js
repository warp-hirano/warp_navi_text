module.exports = {
  // -- Prismic API endpoint
  // Determines which repository to query and fetch data from
  // Configure your site's access point here
  apiEndpoint: 'https://warp-kakigori.cdn.prismic.io/api/v2',

  // -- Access Token if the repository is not public
  // Generate a token in your dashboard and configure it here if your repository is private
  accessToken: '',

  // -- Link resolution rules
  // Manages links to internal Prismic documents
  // Modify as your project grows to handle any new routes you've made
  linkResolver(doc) {
    if (doc.type === 'page') {
      return `/${doc.lang}/${doc.uid}`;
    }
    if (doc.type === 'project') {
      return `/${doc.lang}/projects/${doc.uid}`;
    }
    if (doc.type === 'projectspage') {
      return `/${doc.lang}/projects`;
    }
    if (doc.type === 'blogpage') {
      return `/${doc.lang}/blog`;
    }
    if (doc.type === 'servicepage') {
      return `/${doc.lang}/services`;
    }
    if (doc.type === 'aboutpage') {
      return `/${doc.lang}/about`;
    }
    if (doc.type === 'contactpage') {
      return `/${doc.lang}/contact`;
    }
    if (doc.type === 'homepage') {
      return `/${doc.lang}`;
    }
    if (doc.type === 'blog_post') {
      return `/${doc.lang}/blog/${doc.uid}`;
    }

    return '/';
  },

  // Additional helper function for Next/Link component
  hrefResolver(doc) {
    if (doc.type === 'page') {
      return `/${doc.lang}/${doc.uid}`;
    }
    if (doc.type === 'project') {
      return `/${doc.lang}/projects/${doc.uid}`;
    }
    if (doc.type === 'projectspage') {
      return `/${doc.lang}/projects`;
    }
    if (doc.type === 'blogpage') {
      return `/${doc.lang}/blog`;
    }
    if (doc.type === 'servicepage') {
      return `/${doc.lang}/services`;
    }
    if (doc.type === 'aboutpage') {
      return `/${doc.lang}/about`;
    }
    if (doc.type === 'contactpage') {
      return `/${doc.lang}/contact`;
    }
    if (doc.type === 'homepage') {
      return `/${doc.lang}`;
    }

    if (doc.type === 'blog_post') {
      return `/${doc.lang}/blog/${doc.uid}`;
    }
    return '/';
  },
};
