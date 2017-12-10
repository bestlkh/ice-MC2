if (typeof process === 'object') {
    // Initialize node environment
    require('mocha-jsdom')()
} else {
    window.require = function () { /* noop */ }
}