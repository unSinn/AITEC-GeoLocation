
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'GeoFiend', text: 'GeoFiend stalks you and your friends using Geolocation.' });
};