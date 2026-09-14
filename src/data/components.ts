export type ComponentTechnology = "HTML / CSS" | "React / CSS";

export type ComponentRecord = {
  slug: string;
  title: string;
  purpose: string;
  technology: ComponentTechnology;
  usageContext: string;
  authoredContext: string;
  implementationNotes: string;
  dependencies: string;
  limitations: string[];
  source: {
    label: string;
    description: string;
  };
  preview: {
    label: string;
    description: string;
  };
  published: boolean;
};

export const components: ComponentRecord[] = [
  {
    slug: "responsive-status-card",
    title: "Responsive status card",
    purpose: "A compact status surface that keeps a clear hierarchy from dashboard width down to a narrow mobile column.",
    technology: "HTML / CSS",
    usageContext: "Useful for product dashboards, account summaries, and other content-led surfaces where a short state needs to be understood quickly.",
    authoredContext: "This example was authored as a small interface study: establish the status first, then give supporting detail enough room to breathe.",
    implementationNotes: "The structure uses semantic content grouping and responsive CSS rather than relying on a fixed image or a JavaScript layout system.",
    dependencies: "No external dependencies; uses semantic HTML and CSS.",
    limitations: ["The collection currently documents the component rather than running an interactive preview.", "No client-specific data or production metrics are attached to this example."],
    source: {
      label: "Source surface reserved",
      description: "The authored HTML and CSS source will be available here when the Playground editor story is enabled.",
    },
    preview: {
      label: "Preview surface reserved",
      description: "A constrained, static-safe preview will be added here by the later Playground preview story.",
    },
    published: true,
  },
  {
    slug: "react-feature-list",
    title: "React feature list",
    purpose: "A component-based feature list that makes repeated product benefits easy to scan and reuse.",
    technology: "React / CSS",
    usageContext: "Useful for landing pages, service descriptions, and product sections where repeated points need consistent rhythm and accessible headings.",
    authoredContext: "This example explores a deliberately small React boundary: repeated content stays data-driven while the visual pattern remains easy to inspect.",
    implementationNotes: "The component is framed as a local static example. Its data and presentation are kept separate so later editing can remain predictable.",
    dependencies: "React and local CSS only; no hosted runtime or network dependency.",
    limitations: ["The current route provides explanation and reserved surfaces, not arbitrary code execution.", "No external dependency or hosted demo is required to understand the intended use."],
    source: {
      label: "Source surface reserved",
      description: "The authored React and CSS source will be available here when the Playground editor story is enabled.",
    },
    preview: {
      label: "Preview surface reserved",
      description: "A constrained, static-safe preview will be added here by the later Playground preview story.",
    },
    published: true,
  },
];

export function getComponentBySlug(slug: string): ComponentRecord | undefined {
  return components.find((component) => component.slug === slug);
}

export function isComponentComplete(component: ComponentRecord | undefined): boolean {
  if (!component?.published) {
    return false;
  }

  const hasText = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

  return Boolean(
    hasText(component.slug) &&
      hasText(component.title) &&
      hasText(component.purpose) &&
      hasText(component.technology) &&
      hasText(component.usageContext) &&
      hasText(component.authoredContext) &&
      hasText(component.implementationNotes) &&
      hasText(component.dependencies) &&
      Array.isArray(component.limitations) &&
      component.limitations.length > 0 &&
      component.limitations.every(hasText) &&
      component.source &&
      hasText(component.source.label) &&
      hasText(component.source.description) &&
      component.preview &&
      hasText(component.preview.label) &&
      hasText(component.preview.description),
  );
}

export const publishedComponents = components.filter(isComponentComplete);
