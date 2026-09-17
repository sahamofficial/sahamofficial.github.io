export type ComponentTechnology = "HTML / CSS" | "React / CSS";
export type SupportedComponentSourceFormat = "html-css" | "react-css";

export type ComponentSourceDefinition = {
  label: string;
  description: string;
  editableSource: string;
  format: SupportedComponentSourceFormat;
  allowedDependencies: string[];
  previewLimits: {
    maxCharacters: number;
    maxLines: number;
    maxRenderMs: number;
    allowedTags: string[];
  };
};

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
  source: ComponentSourceDefinition;
  preview: {
    label: string;
    description: string;
  };
  published: boolean;
};

const responsiveStatusCardSource = `
<style>
  .status-card {
    max-width: 420px;
    padding: 1.4rem 1.5rem;
    border: 1px solid rgba(98, 227, 255, 0.25);
    border-radius: 16px;
    background: rgba(11, 16, 32, 0.9);
    color: #eef6ff;
    box-shadow: 0 12px 24px rgba(11, 16, 32, 0.32);
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .status-card__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #62e3ff;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .status-card__eyebrow::before {
    content: "";
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 999px;
    background: #7af0b5;
    box-shadow: 0 0 10px rgba(122, 240, 181, 0.6);
  }

  .status-card__body {
    margin-top: 1rem;
  }

  .status-card__body h2 {
    margin: 0;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    line-height: 1.2;
  }

  .status-card__body p {
    margin: 0.55rem 0 0;
    color: #b7c3d9;
    line-height: 1.6;
  }

  .status-card__meta {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    margin-top: 1.2rem;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(98, 227, 255, 0.18);
    color: #dce8f9;
    font-size: 0.9rem;
  }

  .status-card__meta strong {
    color: #7af0b5;
    font-size: 1.1rem;
  }
</style>
<section class="status-card" aria-label="Service status card">
  <div class="status-card__eyebrow">System status</div>
  <div class="status-card__body">
    <h2>Operations stable</h2>
    <p>All monitored services are responding within expected thresholds and no urgent action is required.</p>
  </div>
  <div class="status-card__meta">
    <span>Updated 2 minutes ago</span>
    <strong>99.97%</strong>
  </div>
</section>
`;

const reactFeatureListSource = `const features = [
  {
    title: "Context-first product stories",
    description: "Explain value before asking for commitment so the benefit feels obvious at a glance.",
  },
  {
    title: "Reusable interface blocks",
    description: "Keep each benefit easy to scan, rearrange, and extend without losing consistency.",
  },
  {
    title: "Accessible rhythm",
    description: "Maintain space and hierarchy so the list reads clearly across small and wide screens.",
  },
];

export default function FeatureList() {
  return (
    <section className="feature-list">
      <div className="feature-list__header">
        <span className="feature-list__tag">What this pattern supports</span>
        <h2>Feature list</h2>
      </div>
      <ul className="feature-list__items">
        {features.map((feature) => (
          <li key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
`;

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
    limitations: [
      "The live preview is intentionally limited to the documented HTML/CSS example and a static-safe subset of browser capabilities.",
      "No client-specific data or production metrics are attached to this example.",
    ],
    source: {
      label: "Source",
      description: "The canonical example stays in this scoped editor. Use Run to apply a safe preview, and Reset to restore the documented source.",
      editableSource: responsiveStatusCardSource,
      format: "html-css",
      allowedDependencies: ["semantic HTML", "inline CSS"],
      previewLimits: {
        maxCharacters: 5000,
        maxLines: 200,
        maxRenderMs: 100,
        allowedTags: ["style", "section", "div", "h2", "p", "span", "strong"],
      },
    },
    preview: {
      label: "Preview",
      description: "Only the current submitted source is rendered, with CSS and markup kept inside the preview boundary.",
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
    limitations: [
      "This preview intentionally supports only the documented React feature-list structure and a safe object-driven data model.",
      "No external dependency or hosted demo is required to understand the intended use.",
    ],
    source: {
      label: "Source",
      description: "This safe React/CSS example accepts only the documented feature-list data shape and a restricted set of DOM tags.",
      editableSource: reactFeatureListSource,
      format: "react-css",
      allowedDependencies: ["React", "local CSS"],
      previewLimits: {
        maxCharacters: 6000,
        maxLines: 200,
        maxRenderMs: 100,
        allowedTags: ["section", "div", "ul", "li", "h2", "h3", "p", "span"],
      },
    },
    preview: {
      label: "Preview",
      description: "The preview re-renders only the submitted React-list source after a deliberate Run action.",
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

  const hasSourceLimits = (value: unknown): value is ComponentRecord["source"]["previewLimits"] => {
    if (!value || typeof value !== "object") {
      return false;
    }
    const limits = value as { maxCharacters?: unknown; maxLines?: unknown; maxRenderMs?: unknown; allowedTags?: unknown };
    return typeof limits.maxCharacters === "number" && limits.maxCharacters > 0 &&
      typeof limits.maxLines === "number" && limits.maxLines > 0 &&
      typeof limits.maxRenderMs === "number" && limits.maxRenderMs > 0 &&
      Array.isArray(limits.allowedTags) && limits.allowedTags.length > 0 && limits.allowedTags.every(hasText);
  };

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
      hasText(component.source.editableSource) &&
      (component.source.format === "html-css" || component.source.format === "react-css") &&
      Array.isArray(component.source.allowedDependencies) &&
      component.source.allowedDependencies.length > 0 &&
      component.source.allowedDependencies.every(hasText) &&
      hasSourceLimits(component.source.previewLimits) &&
      component.preview &&
      hasText(component.preview.label) &&
      hasText(component.preview.description),
  );
}

export const publishedComponents = components.filter(isComponentComplete);
