import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Structuring a Laravel API for a React frontend | Saham Ali",
  description: "A practical note on designing a Laravel API that stays clear and useful to a React frontend.",
};

export default function LaravelApiReactPost() {
  return (
    <article className="section" aria-labelledby="post-title">
      <div className="container section-title">
        <p>Writing / September 9, 2026</p>
        <h1 id="post-title">Structuring a Laravel API for a React frontend</h1>
        <p>A useful API is less about clever endpoints and more about predictable decisions.</p>
      </div>
      <div className="container content">
        <p>
          When a React interface talks to a Laravel application, the quality of the boundary matters as much as the
          individual screens. I try to make that boundary boring in the best sense: resources have consistent shapes,
          validation happens close to the request, and the frontend can make a reasonable decision without knowing how
          the server stores everything.
        </p>
        <h2>Start with the user actions</h2>
        <p>
          Before naming routes, I list what a person needs to do. They may need to view a collection, inspect one item,
          create a record, update it, or remove it. Each action becomes a small contract between the client and server.
          This keeps the API focused on behavior rather than exposing every database column by default.
        </p>
        <h2>Keep response shapes stable</h2>
        <p>
          A React component should not need a different set of null checks for every endpoint. Laravel API resources are
          useful here because they give the response a deliberate public shape. I include the fields the screen needs,
          use consistent names, and make relationships explicit. If a value can be absent, that should be clear in the
          contract instead of being an accidental surprise in production.
        </p>
        <h2>Validate at the boundary</h2>
        <p>
          Form requests keep validation rules out of controllers and make failure responses easier to understand. The
          frontend can then map field errors back to the right inputs, while the server remains the final authority. I
          also distinguish validation failures from authentication, authorization, and unexpected server errors. Those
          cases need different messages and different recovery paths in the UI.
        </p>
        <h2>Design for loading and failure</h2>
        <p>
          The happy path is only one state. The React side needs a loading state, an empty state, a useful error state,
          and a way to retry when a request fails. On the Laravel side, predictable status codes and concise error
          payloads make those states straightforward to implement. This is also where pagination and filtering should be
          agreed early, before a growing list becomes a performance problem.
        </p>
        <p>
          A good Laravel API gives the React frontend room to change without forcing both sides to change at once. That
          flexibility comes from small contracts, explicit data, and errors that help the person using the application.
        </p>
        <p><Link href="/blog">Back to writing</Link></p>
      </div>
    </article>
  );
}
