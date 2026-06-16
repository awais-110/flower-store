/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://videosnap.io",
  generateRobotsTxt: false,
  outDir: "public",
  exclude: ["/admin/*"],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === "/" ? 1 : 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
