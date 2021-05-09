import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Alert from '../components/Layout/Alert';
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ProfileForm from '../components/Forms/Profile/ProfileForm';
import AddExperience from '../components/Forms/Profile/AddExperience';
import AddEducation from '../components/Forms/Profile/AddEducation';
import Profiles from '../components/Profiles/Profiles';
import Profile from '../components/Profile/Profile';
import Posts from '../components/Posts/Posts';
import Post from '../components/Post/Post';
import PrivateRoute from './PrivateRoute';

const Routes = (props) => {
  return (
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
