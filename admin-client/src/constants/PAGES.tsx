import { Dashboard } from "../routes/Dashboard";
import { Login } from "../routes/Login";

type Page = {
    path: string;
    name: string;
    component: JSX.Element;
    private: boolean;
    icon?: JSX.Element;
}

export const PAGES: Page[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        private: true,
        component: <Dashboard />,

    },
    {
        name: 'Login',
        path: '/login',
        private: false,
        component: <Login />,
    }
]