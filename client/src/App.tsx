import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { setLoading, setUser, signOut } from './features/auth/authSlice';
import ConfirmForm from './features/auth/ConfirmForm';
import LoginForm from './features/auth/LoginForm';
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';
import { auth } from './services/firebase';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <button
            onClick={() => {
              dispatch(signOut()).unwrap();
            }}
          >
            SignOut!
          </button>
        </PrivateRoute>
        <GuestRoute path="/login">
          <LoginForm />
        </GuestRoute>
        <GuestRoute path="/confirm">
          <ConfirmForm />
        </GuestRoute>
        <Route>
          <h1>404 page not found!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
