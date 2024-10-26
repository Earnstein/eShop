import ErrorComponent from "@/components/ErrorComponent";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error))
    return (
      <>
        {error.status === 404 ? (
          <ErrorComponent message="Page not found" status={error.status} />
        ) : (
          <ErrorComponent message={error.data} status={error.status} />
        )}
      </>
    );
};

export default ErrorPage;
