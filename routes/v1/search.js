var express = require('express');
var unirest = require('unirest');
var config = require('../../config');
var defResponse = require('../../response');
var database = require('../../database');
var router = express.Router();
var foodData = require('../../row/food');

var path_search = '/';
var path_action = '/action';

var DEF_SEARCH_DISTANCE = 5000; //距離範圍(m)

/* GET users listing.
 * 搜尋任意餐廳位置(預設距離範圍15km)
 */
router.get(path_search, function (req, res, next) {

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

router.get(path_search, function (req, res, next) {
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.lat},${req.lng}&radius=${req.radius}&types=food&key=${config.google_api_token}`;
    console.log(url);

    var request = unirest.get(url);
    request.end(function (response) {
        if (response.statusCode == 200 && response.body.status === 'OK') {
            console.log(response.body);

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

            var food = getFood();
            var restaurant = results[useround(0, results.length - 1)];
            food.place_id = restaurant.place_id;

            res.json(defResponse.success({
                restaurant: restaurant,
                food: food
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


// url => /food/action
//========================================================================================================================
router.get(path_action, function (req, res, next) {
    var place_id = req.query["place_id"];
    var foodId = req.query["foodId"];
    var action = req.query["action"];

    if (place_id === null || typeof (place_id) === 'undefined' ||
        foodId === null || typeof (foodId) === 'undefined' ||
        action === null || typeof (action) === 'undefined') {
        res.statusCode = 500;
        res.send();
        console.log("123");
    } else if (action == 3) {
        //action:3 Go
        getRestaurantByPlacesId(place_id, function (restaurant) {
            console.log(restaurant);
            if (restaurant != null && typeof (restaurant) !== 'undefined') {
                res.json(defResponse.success({}, '已確認前往:' + restaurant.name));
            } else {
                res.sendStatus(500);
            }
        });
    } else {
        var lat = Number(req.query["lat"] || 0.0);
        var lng = Number(req.query["lng"] || 0.0);
        console.log("456");
        if (false == isFloat(lat) || lat === 0.0 || lat < (-90) || lat > 90 ||
            (false == isFloat(lng) || lng === 0.0 || lng < (-180) || lng > 180)) {
            res.statusCode = 500;
            res.send();
            console.log("789");
        } else {
            console.log("1111: " + place_id);
            if (place_id.length <= 0) {
                res.statusCode = 500;
                res.send();
                console.log("000000");
            } else {
                database.get().ref('/restaurant/' + place_id).once('value').then(function (snapshot) {
                    var queryResult = snapshot.val();
                    if (queryResult == null || typeof (queryResult) === 'undefined') {
                        res.statusCode = 500;
                        res.send();
                        console.log("313131");
                    } else {
                        console.log("22222");
                        var location = snapshot.val().location;
                        req.radius = action == 0 ? getDistance(lat, lng, location.lat, location.lng) : DEF_SEARCH_DISTANCE
                        console.log('查詢距離縮短為: ' + req.radius);
                        req.lat = lat;
                        req.lng = lng;
                        req.place_id = place_id;
                        req.foodId = foodId;
                        req.action = action;
                        next();
                    }
                });
            }
        }
    }
});

/* GET users listing.
 * 搜尋任意餐廳位置(預設距離範圍15km)
 */
router.get(path_action, function (req, res, next) {
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.lat},${req.lng}&radius=${req.radius}&types=food&key=${config.google_api_token}`;
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
            console.log("length:" + results.length + " results[0].place_id:" + results[0].place_id + " req.place_id:" + req.place_id);
            if (results.length <= 0 || results.length == 1 && results[0].place_id == req.place_id) {
                res.json(defResponse.error('查無更近的餐廳資訊'));
            } else {
                var food = getFood();
                var restaurant = results[useround(0, results.length - 1)];
                food.place_id = restaurant.place_id;

                res.json(defResponse.success({
                    restaurant: restaurant,
                    food: food
                }));
            }

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



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('api/v1/food');
});

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