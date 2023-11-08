# APIs

## Item Database APIs

### Search for all vehicles

**Input:**

*No Input*

**Example Output:**

```
[
    {
        "_id": "652f8b52567e4097cdafec57",
        "brand": "Toyota",
        "model": "Corolla",
        "colour": "Silver",
        "fuel_type": "Petrol",
        "price": 1000,
        "description": "Droved 1000 km",
        "years_used": 2,
        "registration_date": "12-12-2019",
        "category": "car",
        "new_used": true,
        "images": [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "seller": "65389826e5bccac6ac77cac7",
        "sold": false,
        "createdAt": "2023-10-18T07:37:54.975Z",
        "updatedAt": "2023-10-18T07:37:54.975Z",
        "__v": 0,
        "mileage": 1000
    }
]

```

![getAllCars](/flowcharts/allcars.png)

### Search for vehicles you are selling

**Input:**

| Variable |
|----------|
|Seller|

**Example Output:**

```
[
    {
        "_id": "652f8b52567e4097cdafec57",
        "brand": "Toyota",
        "model": "Corolla",
        "colour": "Silver",
        "fuel_type": "Petrol",
        "price": 1000,
        "description": "Droved 1000 km",
        "years_used": 2,
        "registration_date": "12-12-2019",
        "category": "car",
        "new_used": true,
        "images": [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "seller": "65389826e5bccac6ac77cac7",
        "sold": false,
        "createdAt": "2023-10-18T07:37:54.975Z",
        "updatedAt": "2023-10-18T07:37:54.975Z",
        "__v": 0,
        "mileage": 1000
    }
]
```

![getItems](/flowcharts/currentcars.png)

### Create new vehicle sale

**Input:**

| Variable |
|----------|
|Brand|
|Model|
|Colour|
|Fuel Type|
|Mileage|
|Price|
|Description|
|Years Used|
|Registration Date|
|Category|
|Used (to be removed)| 
|Images|
|Seller|
|Sold|

**Example Output:**

*Output is in Frontend*

![createItem](/flowcharts/createcar.png)

### Search for vehicles you sold

**Input:**

| Variable |
|----------|
|Seller|
|Sold|

**Example Output:**

*To Be Filled*

![getSoldItems](/flowcharts/pastcars.png)

### Update current vehicle sale

**Input:**

| Variable |
|----------|
|Brand|
|Model|
|Colour|
|Fuel Type|
|Mileage|
|Price|
|Description|
|Years Used|
|Registration Date|
|Category|
|Used (to be removed)| 
|Images|
|Seller|
|Sold|

**Example Output:**

*Output is in Frontend*

![updateItem](/flowcharts/updatecar.png)

## Transaction Database APIs

### See current auction bids

**Input:**

| Variable |
|----------|
|Item ID|

**Example Output:**

```
[
    {
        "_id": "6538be90304e0545985b39f1",
        "item_id": "6538bdfb304e0545985b39ed",
        "user_id": "65389826e5bccac6ac77cac7",
        "bid_price": 1500,
        "createdAt": "2023-10-25T07:06:56.666Z",
        "updatedAt": "2023-10-25T07:06:56.666Z",
        "__v": 0
    }
]
```

![getTransaction](/flowcharts/thetransaction.png)

### Create new bids for an auction

**Input:**

| Variable |
|----------|
|Item ID|
|User ID|
|Bid Price|

**Example Output:**

*Output is in Frontend*

![createTransaction](/flowcharts/createtransaction.png)