import React from 'react';
import { useParams } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(window.location.search);
}
 
const withRouter = WrappedComponent => props => {
  const params = useParams();
  const query = useQuery()
  return (
    <WrappedComponent
      {...props}
      params={params}
      query={query}
    />
  );
};
 
export default withRouter;