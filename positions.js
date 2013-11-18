var positions = {};

exports.addPostition = function(geoData) {
	positions[geoData.id] = geoData;
};

exports.getAllPositions = function() {
	return positions;
};