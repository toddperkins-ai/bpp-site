module.exports = function (config) {
  const isProd = process.env.ELEVENTY_ENV === "production";

  // Static passthroughs
  config.addPassthroughCopy({ "public": "/" });
  config.addPassthroughCopy("admin");

  // Helpers
  const filterDrafts = (items) => items.filter(i => (isProd ? !i.data.draft : true));

  // Collections (globs are relative to dir.input = "content")
  config.addCollection("pages", (col) =>
    filterDrafts(col.getFilteredByGlob("pages/*.md"))
  );

  config.addCollection("posts", (col) =>
    filterDrafts(col.getFilteredByGlob("blog/*.md"))
      .sort((a, b) => b.date - a.date)
  );

  config.addCollection("services", (col) =>
    filterDrafts(col.getFilteredByGlob("services/*.md"))
  );

  config.addCollection("locations", (col) =>
    filterDrafts(col.getFilteredByGlob("locations/*.md"))
  );

  // For related-content lookups across the site
  config.addCollection("allContent", (col) => ([
    ...filterDrafts(col.getFilteredByGlob("blog/*.md")),
    ...filterDrafts(col.getFilteredByGlob("services/*.md")),
    ...filterDrafts(col.getFilteredByGlob("locations/*.md")),
    ...filterDrafts(col.getFilteredByGlob("pages/*.md")),
  ]));

  // Filters
  config.addFilter("byCluster", (pages, cluster, currentUrl) =>
    (pages || []).filter(p => p.data.cluster === cluster && p.url !== currentUrl)
  );

  config.addFilter("findBySlug", (pages, slug) =>
    (pages || []).find(p => p.data.slug === slug)
  );

  config.addFilter("abs", function (path) {
    const site = this.ctx.site || { url: "" };
    return `${site.url || ""}${path}`;
  });

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
