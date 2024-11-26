import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-4xl">404 - Page Not Found</h1>
        <p className="text-accent-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link className="text-sky-500 dark:text-sky-400" to="/">
          Go back to Home
        </Link>
      </div>
    </>
  );
}
