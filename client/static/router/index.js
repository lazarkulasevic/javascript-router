import routes from './routes.js'
import { getScrollPosition, saveScrollPosition } from '../utils/scroll-position.js'

const root = document.getElementById('root')
var cache = [], position = 0

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    /**
     * Object.fromEntries() polyfill
     * @author Chris Ferdinandi
     * @license MIT
     */

    if (!Object.fromEntries) {
        Object.fromEntries = function (entries) {
            if (!entries || !entries[Symbol.iterator]) {
                throw new Error('Object.fromEntries() requires a single iterable argument')
            }
            let obj = {}
            for (let [key, value] of entries) {
                obj[key] = value
            }
            return obj
        }
    }

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

const goTo = url => {
    saveScrollPosition(cache)
    position = getScrollPosition(url, cache)
    history.pushState(null, null, url)
    router()
}

const pathToRegex = path => new RegExp(`^${path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/:(\w+)/g, '(?<$1>[^/]+)')}\/?$`)

const router = async () => {
    const potentialMatches = routes.map(route => {
        const currentPath = pathToRegex(route.path)
        return {
            route: route,
            result: location.pathname.match(currentPath)
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    if (!match) {
        match = {
            route: routes[1],
            result: ['/error-404']
        }
    }

    const page = new match.route.component(getParams(match))
    const html = await page.render()

    if (!html) {
        goTo('/error-404')
    }

    root.innerHTML = html
    scrollTo(0, position)
}

window.addEventListener('popstate', () => {
    position = getScrollPosition(location.pathname, cache)
    router()
})

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', event => {
        const link = event.target.closest('a[data-link]')
        if (!!link) {
            event.preventDefault()
            goTo(link.getAttribute('href'))
        }
    })
    router()
})

export default router
