import Hat from '../hat/Hat.js'

export default class extends Hat {
    constructor(params) {
        super(params)
        this.setTitle('404 Not Found')
    }

    async render() {
        return this.template()
    }

    template() {
        return `
            <div class="p-3 align-self-center fade-in">
                <div class="text-center">
                    <h1 class="display-1">404</h1>
                    <p class="lead">The resource you are looking for doesn't exist on this site.</p>
                    <p>Go to <a href="/" data-link>homepage</a> and read something else.</p>
                </div>
            </div>
        `
    }
}
