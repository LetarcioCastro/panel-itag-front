import { App } from "@/app";
import { LayoutApp } from "@/layout";
import { AccountsPage } from "@/pages/accounts";
import { AccountPage } from "@/pages/accounts/view";
import { AccountMapPage } from "@/pages/accounts/view/map";
import { AccountTagsPage } from "@/pages/accounts/view/tag";
import { LoginPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <LayoutApp />,
        children: [
          {
            path: '',
            element: <AccountsPage />
          },
          {
            path: 'contas',
            element: <AccountsPage />
          },
          {
            path: '/contas/:id',
            element: <AccountPage />,
            children: [
              {
                path: '',
                element: <AccountTagsPage />
              },
              {
                path: 'mapa',
                element: <AccountMapPage />
              }
            ]
          },
        ]
      }
    ]
  },

])