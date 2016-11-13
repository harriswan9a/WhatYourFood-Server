# API說明文件

- Base URL：
    https://minithon2-b-team-back-end.herokuapp.com/api

```yml
更新說明：

    2016/11/13
    - 調整API<1>、API<3>餐廳搜尋距離 15km -> 5km
 
    2016/11/06
    - 新增 API<3>取得附近餐廳清單
    
    2016/10/30  
    - 新增 API<1>取得附近餐廳
    - 新增 API<2>操作建議餐廳&餐點 
```

## 1.取得附近餐廳
---
 - GET 
 - /v1/search

``Request``

|參數 |說明        |
|-----|-----------|
| uid | 使用者唯一識別碼(裝置唯一識別碼)|
| lat | 當前座標緯度|
| lng | 當前座標經度|


```
{
    "uid": "",
    "lat": 0.0,
    "lng": 0.0
}
```

``Response``

|參數 |說明        |
|-----|-----------|
|respCode|    請求代碼,非SUCCESS皆為失敗|
|message|回應訊息|
|restaurant|  餐廳資料|
|place_id|    餐廳ID|
|name|        餐廳名稱|
|vicinity|    餐廳接近地址|
|location|    餐廳座標|
|lat|         餐廳座標緯度|
|lng|         餐廳座標緯度|
|food|        餐點資料|
|place_id|    餐點對應的餐廳id|
|id|          餐點ID|
|name|        餐點名稱|
|price|       餐點價格|
|url|         餐點圖片|

```
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
        "place_id" = "ChIJ79nqreMUaTQRlg7RZmOHmNY",
        "id": "f000001",
        "name": "雞腿飯",
        "price": 65,
        "url": "http://www.jengjong.tw/upload/food/20140311185704212.jpg"
    }
}
```


## 2.操作建議餐廳&餐點
---
 - GET 
 - /v1/search/action

``Request``

|參數 |說明        |
|-----|-----------|
|uid | 使用者唯一識別碼(裝置唯一識別碼)|
|lat | 當前座標緯度|
|lng | 當前座標經度|
|place_id| 餐廳ID|
|foodId| 餐點ID|
|action| 0:太遠 , 1:太貴 , 2:不喜歡 4:Go|

##### Error

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

##### Example

```
{
    "uid": "",
    "lat": 0.0,
    "lng": 0.0,
    "place_id": "",
    "foodId": "",
    "action": 0
}
```

``Response``

|參數 |說明        |
|----|----|
|respCode|    請求代碼,非SUCCESS皆為失敗|
|message|     回應訊息|
|restaurant|  餐廳資料|
|place_id|    餐廳ID|
|name|        餐廳名稱|
|vicinity|    餐廳接近地址|
|location|    餐廳座標|
|lat|         餐廳座標緯度|
|lng|         餐廳座標緯度|
|food|        餐點資料|
|place_id|    餐點對應的餐廳id|
|id|          餐點ID|
|name|        餐點名稱|
|price|       餐點價格|
|url|         餐點圖片|

```
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
        "place_id" = "ChIJ79nqreMUaTQRlg7RZmOHmNY",
        "id": "f000001",
        "name": "雞腿飯",
        "price": 65,
        "url": "http://www.jengjong.tw/upload/food/20140311185704212.jpg"
    }
}
```


## 3.取得附近餐廳清單
---
 - GET 
 - /v1/restaurant

``Request``

|參數 |說明         |  型態 |
|-----|-----------|-------|
|uid | 使用者唯一識別碼(裝置唯一識別碼)|String|
|lat | 當前座標緯度|Double|
|lng | 當前座標經度|Double|


##### Error

    未定義

##### Example
[`http://localhost:3000/api/v1/restaurant?uid=userId&lat=24.237044&lng=120.557626`](http://localhost:3000/api/v1/restaurant?uid=userId&lat=24.237044&lng=120.557626)
```
{
    "uid": "userId",
    "lat": 24.237044,
    "lng": 120.557626
}
```

``Response``

|參數 |說明        |型態   |
|----|----|:---|
|respCode|    請求代碼,非SUCCESS皆為失敗  |String|
|message|     回應訊息                  |String|
|count|       餐廳數量                  |Int|
|restaurantList|餐廳資料                  |Array|
|place_id|    餐廳                     |String|
|name|        餐廳名稱                  |String|
|vicinity|    餐廳接近地址               |String|
|location|    餐廳座標                  ||
|lat|         餐廳座標緯度               |Double|
|lng|         餐廳座標緯度               |Double|

```
{
    count: 20,
    restaurant: [{
        place_id: "ChIJ7SOI6iA-aTQRfOHVPDkMM-Y",
        name: "東海蓮心冰雞爪凍",
        vicinity: "No. 1, 新興路一巷, Longjing District",
        location: {
            lat: 24.181288,
            lng: 120.592661
        }
    },
    
    .....(略)
    
    {
        place_id: "ChIJ5-gxyps9aTQRo8EF3yRpOvE",
        name: "R-Star",
        vicinity: "No. 101, Zhongming South Road, West District",
        location: {
            lat: 24.1536683,
            lng: 120.6576592
        }
    }],
    respCode: "SUCCESS",
    message: ""
}
```