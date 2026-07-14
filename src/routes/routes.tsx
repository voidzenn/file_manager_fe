import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import DefaultLayout from '@/layouts/default/DefaultLayout';
import PrivateRoute from '@/layouts/private/PrivateRoute';
import Signup from '@/features/Auth/Signup';
import Signin from '@/features/Auth/Signin';
import Folders from '@/features/Folders/Folders';

import { ROUTES } from "@/constants/routes";
import NotFound from "@/components/common/NotFound";

const Routes = () => {
  return (
    <>
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
            path: ROUTES.folders,
            element: (
              <PrivateRoute>
                <DefaultLayout>
                  <Folders />
                </DefaultLayout>
              </PrivateRoute>
            ),
          },
          {
            path: ROUTES.foldersWithId,
            element: (
              <PrivateRoute>
                <DefaultLayout>
                  <Folders />
                </DefaultLayout>
              </PrivateRoute>
            ),
          },
          {
            path: "*",
            element: (
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
            ),
          },
        ])}
      />
    </>
  );
}

export default Routes;
