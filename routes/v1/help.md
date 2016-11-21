# API說明文件

- Base URL：
    https://minithon2-b-team-back-end.herokuapp.com/api

```yml
更新說明：

    2016/11/21
    - 定義API<4>新增餐廳
    - 定義API<5>新增食物
    - 定義API<6>上傳圖片

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


```json
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

```json
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

```json
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

```json
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

```json
{
  "count": 20,
  "restaurant": [
    {
      "place_id": "ChIJ7SOI6iA-aTQRfOHVPDkMM-Y",
      "name": "東海蓮心冰雞爪凍",
      "vicinity": "No. 1, 新興路一巷, Longjing District",
      "location": {
        "lat": 24.181288,
        "lng": 120.592661
      }
    },
    .....(略)
    {
      "place_id": "ChIJ5-gxyps9aTQRo8EF3yRpOvE",
      "name": "R-Star",
      "vicinity": "No. 101, Zhongming South Road, West District",
      "location": {
        "lat": 24.1536683,
        "lng": 120.6576592
      }
    }
  ],
  "respCode": "SUCCESS",
  "message": ""
}
```

## 4.新增餐廳
---
 - POST 
 - /v1/restaurant
 - Content-Type => application/json

``Request``

|參數 |說明         |  型態 |
|-----|-----------|-------|
|uid | 使用者唯一識別碼(裝置唯一識別碼)|String|
|name | 餐廳名稱|String|
|address | 餐廳地址|String|
|category | 餐廳類別|String|
|photos|餐廳照片|Array|
|location|    餐廳座標                  |Object|
|lat|         餐廳座標緯度               |Double|
|lng|         餐廳座標緯度               |Double|
|food|        餐點資料|Object|
|name|        餐點名稱|String|
|price|       餐點價格|String|
|url|         餐點圖片|String|


##### Error

    未定義

##### Example
[`http://localhost:3000/api/v1/restaurant`](http://localhost:3000/api/v1/restaurant)

```json
{
  "uid": "test_user",
  "name": "鳥居夜景咖啡",
  "address": "433台中市沙鹿區東晉東路767號",
  "photos": [
    "http://www.starwoodhotels.com/pub/media/3573/who3573re.101846_md.jpg",
    "http://cloudfront.eztable.com/imgs/data1_240/1428661767_restaurant_42.jpg"
  ],
  "category": "A01",
  "location": {
    "lat": 24.2200171,
    "lng": 120.5886006
  },
  "food": {
    "name": "牛肉麵",
    "price": 95,
    "url": "https://farm9.staticflickr.com/8627/15801890998_2e915e5403.jpg"
  }
}
```

``Response``

|參數 |說明        |型態   |
|----|----|:---|
|respCode|    請求代碼,非SUCCESS皆為失敗  |String|
|message|     回應訊息                  |String|
|restaurantId|       餐廳ID                  |String|
|foodId|       餐點ID                  |String|


```json
{
  "restaurantId": "6bOl5bGF5aSc5pmv5ZKW5ZWh",
  "foodId": "3e4e867c4538ab081fe87c4a43074cc9",
  "respCode": "SUCCESS",
  "message": ""
}
```

## 5.新增餐點
---
 - POST 
 - /v1/food
 - Content-Type => application/json

``Request``

|參數 |說明         |  型態 |
|-----|-----------|-------|
|uid | 使用者唯一識別碼(裝置唯一識別碼)|String|
|restaurantId | 餐廳ID|String|
|food|        餐點資料|Object|
|name|        餐點名稱|String|
|price|       餐點價格|String|
|url|         餐點圖片|String|


##### Error

    未定義

##### Example
[`http://localhost:3000/api/v1/restaurant`](http://localhost:3000/api/v1/restaurant)

```json
{
  "uid": "test_user",
  "restaurantId": "6bOl5bGF5aSc5pmv5ZKW5ZWh",
  "food": {
    "name": "牛肉麵",
    "price": 95,
    "url": "https://farm9.staticflickr.com/8627/15801890998_2e915e5403.jpg"
  }
}
```

``Response``

|參數 |說明        |型態   |
|----|----|:---|
|respCode|    請求代碼,非SUCCESS皆為失敗  |String|
|message|     回應訊息                  |String|
|foodId|       餐點ID                  |String|


```json
{
  "foodId": "6bOl5bGF5aSc5pmv5ZKW5ZWh",
  "respCode": "SUCCESS",
  "message": ""
}
```

## 6.上傳圖片
---
 - POST 
 - /v1/assets/image
 - Content-Type => application/json

``Request``

|參數 |說明         |  型態 |
|-----|-----------|-------|
|uid | 使用者唯一識別碼(裝置唯一識別碼)|String|
|imageBase64 | 圖檔 |String|


##### Error

    未定義

##### Example
[`http://localhost:3000/api/v1/assets`](http://localhost:3000/api/v1/assets)

```json
{
  "uid": "test_user",
  "imageBase64":"aHR0cDovL3d3dy5zdGFyd29vZGhvdGVscy5jb20vcHViL21lZGlhLzM1NzMvd2hvMzU3M3JlLjEwMTg0Nl9tZC5qcGc="
}
```

``Response``

|參數 |說明        |型態   |
|----|----|:---|
|respCode|    請求代碼,非SUCCESS皆為失敗  |String|
|message|     回應訊息                  |String|
|url|       圖檔url                  |String|


```json
{
  "url": "https://farm9.staticflickr.com/8627/15801890998_2e915e5403.jpg",
  "respCode": "SUCCESS",
  "message": ""
}
```