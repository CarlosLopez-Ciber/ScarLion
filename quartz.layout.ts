import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Explorer con emojis (se reutiliza en ambos layouts)
const explorerWithIcons = Component.Explorer({
  mapFn: (node) => {
    const prefix = node.isFolder ? "📁 " : "📄 "

    // displayName (lo que se ve normalmente)
    if (typeof node.displayName === "string" && !node.displayName.startsWith(prefix)) {
      node.displayName = prefix + node.displayName
    }

    // algunos renders usan name/title (especialmente al entrar a índices)
    const anyNode = node as any
    if (typeof anyNode.name === "string" && !anyNode.name.startsWith(prefix)) {
      anyNode.name = prefix + anyNode.name
    }
    if (typeof anyNode.title === "string" && !anyNode.title.startsWith(prefix)) {
      anyNode.title = prefix + anyNode.title
    }
  },
})

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
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    // ✅ Aquí usamos el Explorer con emojis
    explorerWithIcons,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    // ✅ Aquí también usamos el mismo Explorer con emojis
    explorerWithIcons,
  ],
  right: [],
}

