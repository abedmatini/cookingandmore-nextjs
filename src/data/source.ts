import sourceContent from "./source-content.json";

export type SourcePage = {
  route: string;
  title: string;
  description: string;
  html: string;
  text: string;
  sourceFile: string;
};

const pages = sourceContent as SourcePage[];
const byRoute = new Map(pages.map(page => [page.route, page]));

export function getSourcePage(route: string) {
  return byRoute.get(route);
}

export function getSourceRoutes() {
  return pages.map(page => page.route);
}
