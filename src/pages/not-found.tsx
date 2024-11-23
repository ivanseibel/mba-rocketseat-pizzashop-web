import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </>
  );
}
