/**
 * Custom container
 * @param children what to include in the container
 * @returns {JSX.Element}
 * @constructor
 */

export function Container({ children }) {

  return <div className="container mx-auto px-4">{children}</div>;
}
