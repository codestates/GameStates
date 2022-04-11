module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended', 'react-app'],
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/react-in-jsx-scope': 'off',
		'import/no-unresolved': 'off',
		'react/prop-types': 'off',
	},

	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
			},
		},
	},
};
