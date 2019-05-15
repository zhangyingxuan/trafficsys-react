const proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(proxy('/api/*', {
		target: "http://localhost:3030/",
		pathRewrite: {'^/api': ''},
		changeOrigin: true
	}));
	app.use(proxy('/proxyApi/*', {
		target: "http://localhost:3030/",
		pathRewrite: {'^/proxyApi': ''},
		changeOrigin: true
	}));
};
