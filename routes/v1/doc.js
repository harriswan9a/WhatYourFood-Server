// API說明文件
// Base URL => https://minithon2-b-team-back-end.herokuapp.com/api 

module.exports = [
    // ==============================================================================================================================
    // [GET] URL => /v1/search
    // Request
    // ==========================================
    // uid 使用者唯一識別碼(裝置唯一識別碼)
    // lat 當前座標緯度
    // lng 當前座標經度
    {
        "uid": "",
        "lat": 0.0,
        "lng": 0.0
    }

    ,

    // Response
    // ==========================================
    // respCode:    請求代碼,非SUCCESS皆為失敗
    // message:     回應訊息
    // restaurant:  餐廳資料
    // place_id:    餐廳ID
    // name:        餐廳名稱
    // vicinity:    餐廳接近地址
    // location:    餐廳座標
    // lat:         餐廳座標緯度
    // lng:         餐廳座標緯度
    // food:        餐點資料
    // id:          餐點ID
    // name:        餐點名稱
    // price:       餐點價格
    // url:         餐點圖片
    {
        "respCode": "SUCCESS",
        "message": "",
        "restaurant": {
            "place_id": "ChIJ79nqreMUaTQRlg7RZmOHmNY",
            "name": "肯德基KFC-台中沙鹿餐廳",
            "vicinity": "No. 127, Shatian Road, Shalu District",
            "location": {
                "lat": 24.235836,
                "lng": 120.559077
            }
        },
        "food": {
            "id": "f000001",
            "name": "雞腿飯",
            "price": 65,
            "url": "http://www.jengjong.tw/upload/food/20140311185704212.jpg"
        }
    }

    ,
    // ==============================================================================================================================
    // [GET] URL => /v1/search/action
    // Description: 操作建議餐廳&餐點
    // Request
    // ==========================================
    // uid 使用者唯一識別碼
    // lat 當前座標緯度
    // lng 當前座標經度
    // place_id 餐廳ID
    // foodId 餐點ID
    // action 0:太遠 , 1:太貴 , 2:不喜歡 4:Go
    //
    /*
    //type:0
    {
        "respCode": "ERROR",
        "message": "查無更近的餐廳資訊"
    }
    //type:3
    {
        "respCode": "SUCCESS",
        "message": "已確認前往:秋田武咖啡"
    }
    */
    {
        "uid": "",
        "lat": 0.0,
        "lng": 0.0,
        "place_id": "",
        "foodId": "",
        "action": 0
    }

    ,

    // Response
    // ==========================================
    // respCode:    請求代碼,非SUCCESS皆為失敗
    // message:     回應訊息
    // restaurant:  餐廳資料
    // place_id:    餐廳ID
    // name:        餐廳名稱
    // vicinity:    餐廳接近地址
    // location:    餐廳座標
    // lat:         餐廳座標緯度
    // lng:         餐廳座標緯度
    // food:        餐點資料
    // id:          餐點ID
    // name:        餐點名稱
    // price:       餐點價格
    // url:         餐點圖片
    {
        "respCode": "SUCCESS",
        "message": "",
        "restaurant": {
            "place_id": "ChIJ79nqreMUaTQRlg7RZmOHmNY",
            "name": "肯德基KFC-台中沙鹿餐廳",
            "vicinity": "No. 127, Shatian Road, Shalu District",
            "location": {
                "lat": 24.235836,
                "lng": 120.559077
            }
        },
        "food": {
            "id": "f000001",
            "name": "雞腿飯",
            "price": 65,
            "url": "http://www.jengjong.tw/upload/food/20140311185704212.jpg"
        }
    }
    // ==============================================================================================================================
]