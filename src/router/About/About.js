import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";

function About() {
  let { path, url } = useRouteMatch();
  let history = useHistory();

  const [arr, setArr] = useState([1,2,3]);

  useEffect(() => {
    setArr([1,2,3,4])
  }, [])
  
  return <div>
    <span>{arr}</span>
    <span>about</span>
    <span>{arr}</span>
    <div onClick={() => history.push('/user')}>跳转到user</div>
    <ul>
      <li>
        <Link to={`${url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Switch>
      <Route exact path={path}>
        <h3>Please select a topic.</h3>
      </Route>
      <Route path={`${path}/:topicId`}>
        <Topic />
      </Route>
    </Switch>

  </div>
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();
  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

export default About;