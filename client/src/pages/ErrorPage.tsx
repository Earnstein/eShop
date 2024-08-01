import ErrorComponent from "@/components/ErrorComponent";
import { useRouteError, isRouteErrorResponse } from "react-router-dom"
const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>{error.status === 404 ? <ErrorComponent message="Page not found"/> : <ErrorComponent message={error.data}/>}</>
    )
  }
}

export default ErrorPage;