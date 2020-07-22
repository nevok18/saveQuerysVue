import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: []
})

function hasQueryParams(route) {
    if (typeof route === 'string') return route.includes('?')
    return Object.keys(route.query).length
}
function isSameQuery(to, from) {
    if (to === '/') return false
    if (typeof to === 'string') return true
    return Object.keys(to.query)[0] === Object.keys(from.query)[0]
}

router.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    const from = this.history.current
    if (isSameQuery(location, from) && hasQueryParams(from) && !hasQueryParams(location)) {
        const query = from.query
        if (typeof location === 'string') location = { path: location, query }
        else location = { ...location, query }
    }
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
        return new Promise(function (resolve, reject) {
            this$1.history.push(location, resolve, reject);
        })
    } else {
        this.history.push(location, onComplete, onAbort);
    }
};
export default router