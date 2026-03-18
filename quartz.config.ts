import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ScarLion",
    pageTitleSuffix: " Bitácora",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "es-ES",
    baseUrl: "carloslopez-ciber.github.io/ScarLion/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Jersey 20",
        body: "Jersey 20",
        code: "Jersey 20",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e9f0",
          gray: "#d8dee9",
          darkgray: "#4c566a",
          dark: "#2e3440",
          secondary: "#5e81ac",
          tertiary: "#8fbcbb",
          highlight: "rgba(136, 192, 208, 0.15)",
          textHighlight: "rgba(235, 203, 139, 0.4)",
        },
        darkMode: {
          light: "#2e3440",
          lightgray: "#434c5e",
          gray: "#4c566a",
          darkgray: "#e5e9f0",
          dark: "#ffffff",
          secondary: "#5e81ac",
          tertiary: "#8fbcbb",
          highlight: "rgba(136, 192, 208, 0.15)",
          textHighlight: "rgba(235, 203, 139, 0.4)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssLimit: 15,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
