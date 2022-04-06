module.exports = {
<<<<<<< HEAD
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends:['airbnb','prettier/react', 'eslint:recommended','plugin:prettier/recommended'],
    rules:{
      'react/jsx-filename-extension': 
      ['error', { 'extensions': [".js", ".jsx"] }],
    }
  }; 
=======
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended', 'react-app'],
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/react-in-jsx-scope': 'off',
	},
};
>>>>>>> 9434b52e5d6d90aa4d81323b2f823f6ae67ec903
