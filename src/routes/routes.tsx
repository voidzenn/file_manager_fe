import { 
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect
} from "react-router-dom";

import DefaultLayout from '@/layouts/default/DefaultLayout';
import PrivateRoute from '@/layouts/private/PrivateRoute';
import Signup from '@/features/Auth/Signup';
import Signin from '@/features/Auth/Signin';
import Home from "@/features/Home/Home";

import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const Routes = () => {
  const { auth } = useAuthStore();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      redirect(ROUTES.home);
    }
  }, [auth]);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: ROUTES.root,
          element: <Navigate to="/signin" replace />,
        },
        {
          path: ROUTES.signin,
          element: (
            <DefaultLayout>
              <Signin />
            </DefaultLayout>
          ),
        },
        {
          path: ROUTES.signup,
          element: (
            <DefaultLayout>
              <Signup />
            </DefaultLayout>
          ),
        },
        {
          path: ROUTES.home,
          element: (
            <PrivateRoute>
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            </PrivateRoute>
          ),
        },
      ])}
    />
  );
}

export default Routes;
