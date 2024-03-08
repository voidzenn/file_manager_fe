import { BrowserRouter as Router } from "react-router-dom";

import { DefaultLayout } from '@/layouts/default/DefaultLayout';
import Signup from '@/features/Auth/Signup';
import Signin from '@/features/Auth/Signin';

const Routes = () => {
  return (
    <Router>
      <DefaultLayout path="/" component={<Signin />} />
      <DefaultLayout path="/signup" component={<Signup />} />
    </Router>
  );
}

export default Routes;
