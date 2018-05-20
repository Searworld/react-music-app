import {Router, Route, Link, indexRoute} from 'react-router'

const routes = [
    {
        path: '/',
        component: () => import('../App.js'),
        indexRoute: {component: () => import('../view/player/player.js')},
        childRoutes: [
            {path: 'list', component: () => import('../view/musicList/musicList.js')}
        ]
    }
]
export default routes

