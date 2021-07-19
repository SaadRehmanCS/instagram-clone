import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/ProtectedRoute';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Notfound = lazy(() => import('./pages/notfound'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
    <Router>
      <Suspense fallback={<img src="https://instagramothers.s3.eu-west-2.amazonaws.com/loading_icon_instagram.png"
        alt="Loading page icon"
        className="align-middle w-2/12 m-auto py-44" />}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoute>
          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
