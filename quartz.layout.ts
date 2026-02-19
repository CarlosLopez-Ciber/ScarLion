import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/CarlosLopez-Ciber",
      LinkedIn: "https://www.linkedin.com/in/carloslopez-ciber/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
  mapFn: (node) => {
    const prefix = node.isFolder ? "📁 " : "📄 "

    // Evita que se duplique si se procesa más de una vez
    if (typeof node.displayName === "string" && !node.displayName.startsWith(prefix)) {
      node.displayName = prefix + node.displayName
    }

    // Algunos renders (especialmente el activo) usan `name` o `title`
    if (typeof (node as any).name === "string" && !(node as any).name.startsWith(prefix)) {
      ;(node as any).name = prefix + (node as any).name
    }

    if (typeof (node as any).title === "string" && !(node as any).title.startsWith(prefix)) {
      ;(node as any).title = prefix + (node as any).title
    }
  },
}),

  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
