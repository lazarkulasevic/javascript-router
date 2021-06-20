import Hat from '../hat/Hat.js'
import API from '../api/index.js'

export default class extends Hat {
    constructor(params) {
        super(params)
        this.setTitle('About')
    }

    async render() {
        return this.get(API).then(json => {
            return this.template(json.about)
        })
    }

    template(data) {
        return `
            <div class="fade-in content-column">
                <h1>${data.title}</h1>
                <hr>
                <div>${data.textBody}</div>
            </div>
        `
    }
}
