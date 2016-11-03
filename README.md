# power-simple
简单电源管理


* GET /all  
取得所有电源状态，按最新更新排序
```
==>
[
  {
    "mac": "aa:bb:cc",
    "status": "OFF",
    "_id": "y2KsoAFrXaDFr30w",
    "createdAt": "2016-11-03T03:01:28.545Z",
    "updatedAt": "2016-11-03T03:01:28.545Z"
  },
  {
    "mac": "aa:bb:cc:ee:xx",
    "status": "ON",
    "_id": "U4B9vLvuxeY1729a",
    "createdAt": "2016-11-03T03:01:20.290Z",
    "updatedAt": "2016-11-03T03:01:20.290Z"
  }
]
```

* POST /set  
设置电源状态
```
<==
{"mac":"aa:bb:cc:ee:xx","status":"ON"}
==>
{
    "mac": "aa:bb:cc:ee:xx",
    "status": "ON",
    "_id": "bjB0xQajiCRCrgFy",
    "createdAt": "2016-11-03T02:53:42.893Z",
    "updatedAt": "2016-11-03T02:53:42.893Z"
}
```

* GET /:mac  
取得电源状态,未登记的mac一律返回"ON"
```
GET http://localhost:3000/aa:bb:cc
==>
OFF
```


