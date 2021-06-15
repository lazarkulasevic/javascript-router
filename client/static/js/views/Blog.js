import Hat from '../hat/Hat.js'
import { getLocalDate } from '../utils/date-time.js'
import API from '../api/index.js'

export default class extends Hat {
    constructor(params) {
        super(params)
        this.setTitle('Blog')
    }

    async render() {
        return this.get(API).then(json => {
            return this.template(json.blog)
        })
    }

    template(data) {
        return `
            <div class="container-fluid">
                <div class="row mb-2">
                    ${data.map((post, i) => {
                        if (i < 1) {
                            return `
                                <div class="p-4 p-md-5 mb-4 text-white bg-dark">
                                    <div class="col-md-6 px-0">
                                        <h1 class="display-4 fst-italic">${post.title}</h1>
                                        <p class="lead my-3">${post.description}</p>
                                        <p class="lead mb-0">
                                            <a href="/blog/${post.slug}" class="text-decoration-none text-white fw-bold" data-link>Continue reading <i class="bi-chevron-right"></i></a>
                                        </p>
                                    </div>
                                </div>   
                            `
                        }
                        return `
                            <div class="col-md-6">
                                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div class="col p-4 d-flex flex-column position-static">
                                        <h3 class="mb-0">${post.title}</h3>
                                        <div class="mb-1 text-muted">${getLocalDate(post.createdAt)}</div>
                                        <p class="card-text mt-2">${post.description}</p>
                                        <a href="/blog/${post.slug}" class="stretched-link p-0 text-decoration-none text-start" data-link>
                                            Continue reading <i class="bi-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `
                    }).join('')}
                </div>
            </div>
        `
    }
}
