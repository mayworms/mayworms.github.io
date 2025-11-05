import { DateTime } from 'luxon';

export default function(eleventyConfig) {
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

  // Return the length of a collection for tag clouds (thank you Claus!!)
  eleventyConfig.addFilter('length', (collection) => {
    return collection[1].length;
  });

  // Date formatting
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat(
      'yyyy-LL-dd'
    );
  });

  eleventyConfig.addFilter('topDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat(
      'yyyy LLLL dd'
    );
  });

  // BaguetteBox code
  eleventyConfig.addPassthroughCopy({
    "./node_modules/baguettebox.js/dist/baguetteBox.js": "/assets/js/baguetteBox.js",
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/baguettebox.js/dist/baguetteBox.css" : "/styles/baguetteBox.css",
  });

  eleventyConfig.addPassthroughCopy({
    "./samuelscode.js" : "/assets/js/samuelscode.js",
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}