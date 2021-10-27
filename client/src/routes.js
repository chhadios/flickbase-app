import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import MainLayout from './hoc/mainlayout';
import Home from './components/home';
import Header from './components/navigation/header'
import AuthGuard from './hoc/authGuard';
import Auth from './components/auth';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthUser } from './store/actions/users_actions';
import Loader from './utils/loader';
import Dashboard from './components/dashboard';
import Profile from './components/dashboard/profile';
import Articles from './components/dashboard/articles';
import Article from './components/articles';
import AddArticle from './components/dashboard/articles/add';
import EditArticle from './components/dashboard/articles/edit';
const Routes = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const users=useSelector(state=> state.users);
  useEffect(() => {
    dispatch(isAuthUser())
  }, [dispatch])

  useEffect(() => {
    if(users.Auth !== null){
      setLoading(false)
    }
  }, [users])

  return (
    <BrowserRouter>
      <Header />
      {loading ?
        <Loader/> :
        <MainLayout>
          <Switch>
            <Route path="/dashboard/articles/edit/:id" component={AuthGuard(EditArticle,true)} />
            <Route path="/dashboard/articles/add" component={AuthGuard(AddArticle,true)} />
            <Route path="/dashboard/articles" component={AuthGuard(Articles,true)} />
            <Route path="/dashboard/profile" component={AuthGuard(Profile)} />
            <Route path="/dashboard" component={AuthGuard(Dashboard)} />
            <Route path="/article/:id" component={Article} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>
      }
      <GoogleFontLoader
        fonts={[
          { font: 'Roboto', weight: [300, 400, 900] },
          { font: 'Fredoka One' }
        ]}
      />
    </BrowserRouter>
  )
}
export default Routes;