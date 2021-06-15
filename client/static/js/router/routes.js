import Home from '../views/Home.js'
import Blog from '../views/Blog.js'
import Post from '../views/Post.js'
import NotFound from '../views/NotFound.js'
import About from '../views/About.js'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/error-404',
        component: NotFound
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/blog/:slug',
        component: Post
    }
]

export default routes
