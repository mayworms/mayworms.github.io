// eleventy.config.js (ESM)
import { DateTime } from 'luxon';
import * as markdownItModule from "markdown-it";
import * as anchorModule from "markdown-it-anchor";

const markdownIt = markdownItModule.default ?? markdownItModule;
const anchor = anchorModule.default ?? anchorModule;

// @ts-ignore
import pluginTOC from 'eleventy-plugin-nesting-toc';

export default function(eleventyConfig) {
  // Markdown-it + markdown-it-anchor setup
  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  });

  // configure anchor permalinks (insert the '#' inside header)
  md.use(anchor, {
    permalink: anchor.permalink.linkInsideHeader({
      symbol: `<span aria-hidden="true">#</span>`,
      placement: 'before'
    })
  });
  // md.use(anchor, {
  // permalink: anchor.permalink.headerLink({ safariReaderFix: true })}); <-- fixes Safari Reader mode BUT breaks Table of Contents plug-in (god damn it!)

  // tell Eleventy to use this markdown-it instance
  eleventyConfig.setLibrary("md", md);

  // Handle CJS vs ESM export surface
  const tocPlugin = pluginTOC?.default ?? pluginTOC;

  // Add TOC plugin (now tocPlugin is defined)
  eleventyConfig.addPlugin(tocPlugin, { ignoredElements: ['span'] });

  // Passthrough and watch targets
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addWatchTarget("./src/images/");

  // Adds Next & Previous links to the bottom of my blog posts
  eleventyConfig.addCollection("posts", function(collection) {
    const coll = collection.getFilteredByTag("posts");
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];
      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }
    return coll;
  });

  // Return the length of a collection for tag clouds
  eleventyConfig.addFilter('length', (collection) => {
    return collection[1].length;
  });

  // Date formatting
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat('yyyy-LL-dd');
  });
  eleventyConfig.addFilter('topDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat('yyyy LLLL dd');
  });

  // BaguetteBox code
  eleventyConfig.addPassthroughCopy({
    "./node_modules/baguettebox.js/dist/baguetteBox.js": "/assets/js/baguetteBox.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/baguettebox.js/dist/baguetteBox.css": "/styles/baguetteBox.css",
  });
  eleventyConfig.addPassthroughCopy({
    "./samuelscode.js": "/assets/js/samuelscode.js",
  });

  return {
    dir: { input: "src", output: "public" },
  };
}
