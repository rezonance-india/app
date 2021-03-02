import React from 'react';

const withError = (Component) => ({error, ...rest}) => {
	if (error) {
		return <div> Something went wrong </div>;
	}
	return <Component {...rest} />;
};

export default withError;
