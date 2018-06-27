var postcss = require('postcss');

module.exports = postcss.plugin('postcssPrefixer', function postcssPrefixer(options) {
	return function (css) {
		options = options || {};
		css.walkRules(function (rule) {
			rule.walkDecls(function (decl, i) {

				// var prefix = '-pichachu-';
				// decl.prop = prefix + decl.prop;
				// console.log("prefixes are added!");
			});
		});
	}
});
