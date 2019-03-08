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

export const social = [
    {
        icon: "icon__fb",
        href: "xxx"
    },
    {
        icon: "icon__twitter",
        href: "xxx"
    },

    {
        icon: "icon__insta",
        href: "xxx"
    }
]

export const servicePayload = [
    {
        label: "category",
        type: "text",
        required: true
    },
    {
        label: "label",
        type: "text",
        required: true
    },
    {
        label: "duration",
        type: "number",
        required: true
    },
    {
        label: "price",
        type: "number",
        required: true
    },
    {
        label: "promotion",
        type: "number",
        required: false
    },
    {
        label: "description",
        type: "text",
        required: false
    }
]

export const contactFields = [
    {
        label: "name",
        type: "text",
        required: true
    },
    {
        label: "email",
        type: "email",
        required: true
    },
    {
        label: "message",
        type: "test",
        required: true
    }
]

export const loginFields = [
    {
        label: "username",
        type: "text",
        required: true
    },
    {
        label: "password",
        type: "password",
        required: true
    }
]