import DiseasesModel from "./components/DiseasesModel/DiseasesModel";
import LoginPage from "./components/LoginPage/LoginPage";
import Quiz from "./components/Quiz/Quiz";
import UserMainPage from "./components/UserMainPage/UserMainPage";

export const routes = [
    {
        path: '/',
        exact: true,
        element: <UserMainPage />,
        isProtected: true
    },

    {
        path: '/quiz',
        exact: true,
        element: <Quiz />,
        isProtected: true
    },

    {
        path: '/diseases-model',
        exact: true, 
        element: <DiseasesModel />,
        isProtected: false
    },

    {
        path: '/login',
        exact: true,
        element: <LoginPage />,
        isProtected: false
    }
]