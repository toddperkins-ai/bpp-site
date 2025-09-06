module.exports = function (config) {
  const isProd = process.env.ELEVENTY_ENV === "production";

  // Copy static assets from /public to site root
  config.addPassthroughCopy({ "public": "/" });
  config.addPassthroughCopy({ "public": "/" });
  config.addPassthroughCopy({ "admin/config.yml": "admin/config.yml" });


  // Hide drafts in production, show everything in dev
  function filterDrafts(items) {
    return items.filter(i => (isProd ? !i.data.draft : true));
  }

  // Collections
  config.addCollection("posts", (col) =>
    filterDrafts(
      col.getFilteredByGlob("content/blog/*.md")
    ).sort((a, b) => b.date - a.date)
  );

  config.addCollection("services", (col) =>
    filterDrafts(col.getFilteredByGlob("content/services/*.md"))
  );

  config.addCollection("locations", (col) =>
    filterDrafts(col.getFilteredByGlob("content/locations/*.md"))
  );

  // Combined collection for "related content" lookups
  config.addCollection("allContent", (col) => {
    return [
      ...filterDrafts(col.getFilteredByGlob("content/blog/*.md")),
      ...filterDrafts(col.getFilteredByGlob("content/services/*.md")),
      ...filterDrafts(col.getFilteredByGlob("content/locations/*.md")),
    ];
  });

  // Filters
  // Make absolute URLs
  config.addFilter("abs", function (path) {
    const site = this.ctx.site || { url: "" };
    return `${site.url || ""}${path}`;
  });

  // Join two arrays in templates: arr | concat(arr2)
  config.addFilter("concat", function (arr1, arr2) {
    if (!Array.isArray(arr1)) arr1 = [];
    if (!Array.isArray(arr2)) arr2 = [];
    return arr1.concat(arr2);
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
