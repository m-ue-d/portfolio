/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from "@solidjs/router";

import './index.css';
import App from './App';
import Friendpage from './pages/Friendspage';
import Page404 from './pages/Page404';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
  <Router>
    <Route path="/" component={App} />
    <Route path="/friends" component={Friendpage} />
    <Route path="*" component={Page404} />
  </Router>
  ), root!
);