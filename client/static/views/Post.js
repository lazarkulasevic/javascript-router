import Hat from '../hat/Hat.js'
import { getLocalDate } from '../utils/date-time.js'
import API from '../api/index.js'

export default class extends Hat {
    constructor(params) {
        super(params)
        this.slug = params.slug
    }

    async render() {
        return this.get(API).then(data => {
            const post = data.blog.find(post => post.slug === this.slug)
            if (!!post) {
                this.setTitle(post.title)
                return this.template(post)
            }
            return null
        }).catch(error => {
            console.error(error)
            return null
        })
    }

    template(data) {
        return `
            <article class="blog-post fade-in content-column">
                <h2>${data.title}</h2>
                <p class="blog-post-meta">${getLocalDate(data.createdAt)}</p>
                <p class="lead">${data.description}</p>
                <hr>
                <div>${data.textBody}</div>
            <article>
        `
    }
}
