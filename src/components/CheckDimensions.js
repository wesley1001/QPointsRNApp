'use strict';

import Dimensions from 'Dimensions';

module.exports = (function () {
	return {
		isHeight: function() {
			return Dimensions.get('window').height;
		},
		isWidth: function() {
			return Dimensions.get('window').width;
		}
 	};
}());