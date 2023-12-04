/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable function-paren-newline */
/* eslint-disable no-var */
/* eslint-disable no-void */
/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { NextScript } from 'next/document';

function dedupe(bundles) {
  const files = new Set();
  const kept = [];
  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }
  return kept;
}
/**
 * Custom NextScript to defer loading of unnecessary JS.
 * Standard behavior is async. Compatible with Next.js 10.0.3
 */
class DeferNextScript extends NextScript {
  getDynamicChunks(files) {
    const {
      dynamicImports,
      assetPrefix,
      isDevelopment,
      devOnlyCacheBusterQueryString,
    } = this.context;
    return dedupe(dynamicImports).map((bundle) => {
      if (!bundle.file.endsWith('.js') || files.allFiles.includes(bundle.file))
        return null;
      return React.createElement('script', {
        defer: !isDevelopment,
        key: bundle.file,
        src: `${assetPrefix}/_next/${encodeURI(
          bundle.file,
        )}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN,
      });
    });
  }

  getScripts(files) {
    var _a;
    const {
      assetPrefix,
      buildManifest,
      isDevelopment,
      devOnlyCacheBusterQueryString,
    } = this.context;
    const normalScripts = files.allFiles.filter((file) => file.endsWith('.js'));
    const lowPriorityScripts =
      (_a = buildManifest.lowPriorityFiles) === null || _a === void 0
        ? void 0
        : _a.filter((file) => file.endsWith('.js'));
    return [...normalScripts, ...lowPriorityScripts].map((file) =>
      React.createElement('script', {
        key: file,
        src: `${assetPrefix}/_next/${encodeURI(
          file,
        )}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        defer: !isDevelopment,
        crossOrigin: this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN,
      }),
    );
  }
}
export default DeferNextScript;
