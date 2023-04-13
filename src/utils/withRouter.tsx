import React, { ComponentType } from 'react';
import { useParams } from 'react-router-dom';

/*
 * This is a HOC that injects the router object into the component's props.
 * It's a workaround for the fact that react-router-dom uses hooks
 * and React 15 doesn't support hooks.
 */

export interface WithRouterProps {
  router: {
    params: {
      countrySlug: string;
    };
  };
}

function withRouter<T extends WithRouterProps = WithRouterProps>(Component: ComponentType<T>) {
  function ComponentWithRouterProp(props: Omit<T, keyof WithRouterProps>) {
    const params = useParams();

    return <Component {...(props as T)} router={{ params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
