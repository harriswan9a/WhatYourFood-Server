var express = require('express');
var unirest = require('unirest');
var config = require('../../config');
var defResponse = require('../../response');
var database = require('../../database');
var router = express.Router();
var foodData = require('../../row/food');

var path = '/';
var DEF_SEARCH_DISTANCE = 5000; //距離範圍(m)

/* GET users listing.
 * 搜尋任意餐廳位置(預設距離範圍15km)
 */
router.get('/', function (req, res, next) {

    var lat = Number(req.query["lat"] || 0.0);
    var lng = Number(req.query["lng"] || 0.0);

    if (false == isFloat(lat) || lat === 0.0 || lat < (-90) || lat > 90 ||
        (false == isFloat(lng) || lng === 0.0 || lng < (-180) || lng > 180)) {
        res.statusCode = 500;
        res.send();
    } else {
        req.lat = lat;
        req.lng = lng;
        req.radius = DEF_SEARCH_DISTANCE;
        next();
    }
});

router.get(path, function (req, res, next) {
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.lat},${req.lng}&radius=${req.radius}&types=food&key=${config.google_api_token}`;
    // var url = `https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${req.lat},${req.lng}&radius=${req.radius}&key=${config.google_api_token}&types=food`;
    console.log(url);

    var request = unirest.get(url);
    request.end(function (response) {
        if (response.statusCode == 200 && response.body.status === 'OK') {
            // console.log(response.body);

            var db = database.get();
            var results = [];
            response.body.results.forEach(function (data) {

                var result = {
                    place_id: data.place_id,
                    name: data.name,
                    vicinity: data.vicinity,
                    location: {
                        lat: data.geometry.location.lat,
                        lng: data.geometry.location.lng
                    }
                };

                db.ref('restaurant/' + data.place_id).set(result);
                results.push(result);
            }, this);

            res.json(defResponse.success({
                count: results.length,
                restaurantList: results
            }));

        } else {
            var errorMsg = "Request Error";
            if (response.body.status != null && typeof (response.body.status) !== 'undefined' && response.body.status.length > 0) {
                errorMsg = response.body.status;
            }
            res.json(defResponse.error(errorMsg));
        }
    });
});


function checkValue(req, res, next) {
    var lat = Number(req.query["lat"] || 0.0);
    var lng = Number(req.query["lng"] || 0.0);

    if (false == isFloat(lat) || lat === 0.0 || lat < (-90) || lat > 90 ||
        (false == isFloat(lng) || lng === 0.0 || lng < (-180) || lng > 180)) {
        res.statusCode = 500;
        res.send();
    } else {
        req.lat = lat;
        req.lng = lng;
        req.radius = req.radius || DEF_SEARCH_DISTANCE;
        next();
    }
}

module.exports = router;

/* utils */
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}


/*
【原始】
　範例：Math.random()
值範圍：0 ~ 0.9999999(無窮小數)
 
【最大值】
　範例：Math.random() * 3
值範圍：0 ~ 2.9999999(無窮小數)
 
【有最小值】
　範例：Math.random() * 2 + 1
值範圍：1 ~ 1.9999999(無窮小數)
 
【四捨五入】
　範例：Math.round(Math.random*2+1)
值範圍：(1) - (1.5) - (2) - (2.5) - (3)
 
【取得大於指定數的最小整數值】
　範例：Math.ceil(Math.random()*2)
值範圍：(0) - (0.5) - (1) - (1.5) - (2)
　注意：在Javascript中，Math.ceil(0) 等於 0
 
【取得小於指定數的最大整數值】
　範例：Math.floor(Math.random()*2+1)
值範圍：(1) - (1.5) - (2) - (2.5) - (3)
*/

//下列為自訂範圍值的亂數函式(最小值,最大值)
function usefloor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function useceil(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min - 1);
}

function useround(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getFood() {
    return foodData[useround(0, foodData.length - 1)];
}

//計算兩點座標距離
// function getDistance(lat1, lng1, lat2, lng2) {
//     // 距離
//     var gpsLatLng = new google.maps.LatLng(lat1, lng1)

//     var targetLatLng = new google.maps.LatLng(lat2, lng2)

//     var distance = google.maps.geometry.spherical.computeDistanceBetween(gpsLatLng, targetLatLng);
//     console.log("12345===>" + distance);
//     return distance;
// }

function getDistance(lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = toRadians(lat1);
    var radLat2 = toRadians(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRadians(lng1) - toRadians(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;

    function toRadians(d) {
        return d * Math.PI / 180;
    }
}

function getRestaurantByPlacesId(placesId, callback) {
    if (placesId.length <= 0) {
        callback(null);
    } else {
        database.get().ref('/restaurant/' + placesId).once('value').then(function (snapshot) {
            var queryResult = snapshot.val();
            console.log(queryResult);
            if (queryResult == null || typeof (queryResult) === 'undefined' || queryResult.place_id === null || typeof (queryResult.place_id) === 'undefined') {
                callback(null);
            } else {
                callback(queryResult);
            }
        });
    }
}