class Hat {
    constructor(params) {
        this.params = params
    }

    setTitle(title) {
        document.title = title
    }

    async get(API) {
        const response = await fetch(API, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        if (!response.ok) {
            throw new Error(`Status code is ${response.status}. Failed to fetch data.`)
        }
        return response.json()
    }
}

export default Hat
