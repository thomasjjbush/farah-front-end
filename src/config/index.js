import Home from './../containers/home/Home';
import Service from './../containers/service/Service';
import Admin from './../containers/admin/Admin';
import Dashboard from './../containers/dashboard/Dashboard';

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/service/hair',
        exact: true,
        component: Service 
    },
    {
        path: '/service/beauty',
        exact: true,
        component: Service 
    },
    {
        path: '/service/specialist',
        exact: true,
        component: Service 
    },
    {
        path: '/admin',
        exact: true,
        component: Admin 
    },
    {
        path: '/admin/dashboard',
        exact: true,
        component: Dashboard 
    },
    {
        path: '/admin/dashboard/:id',
        exact: true,
        component: Dashboard 
    }
]

export const configuration = {
    hair: {
        color: '#000000'
    },
    beauty: {
        color: '#000000'
    },
    specialist: {
        color: '#000000'
    }
}