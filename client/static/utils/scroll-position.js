const getScrollPosition = (url, cache) => {
    return cache.filter(page => url === page.location)[0]?.position
}

const saveScrollPosition = cache => {
    const page = cache.filter(page => location.pathname === page.location)[0]

    if (page) {
        page.position = scrollY
    } else {
        cache.push({
            location: location.pathname,
            position: scrollY
        })
    }

    return cache
}

export { getScrollPosition, saveScrollPosition }
