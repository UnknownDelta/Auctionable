# Auction Controller and Model Documentation

This document provides an overview of the Auction Controller and the Auction Model. These components handle the functionality related to auction cars and their data in the application.

## Auction Controller (auctionController.js)

### `getAllAuctionCars`
- **Description**: Retrieves a list of all auction cars sorted by creation date in descending order.
- **HTTP Method**: GET
- **Route**: `/auctions`
- **Parameters**: None
- **Response**: Returns a JSON array of auction cars.

### `getAuction`
- **Description**: Retrieves a single auction car by its ID.
- **HTTP Method**: GET
- **Route**: `/auctions/:id`
- **Parameters**: `id` (Auction ID)
- **Response**: Returns a JSON object representing the auction car.

### `createAuction`
- **Description**: Creates a new auction car listing.
- **HTTP Method**: POST
- **Route**: `/createauction`
- **Request Body Parameters**:
  - `brand`: Brand of the car.
  - `model`: Model of the car.
  - `...` (Other relevant parameters)
- **Response**: Returns the created auction car as a JSON object.

### `getAuctionItems`
- **Description**: Retrieves a list of auction cars posted by a specific seller.
- **HTTP Method**: GET
- **Route**: `/auctions/:seller`
- **Parameters**: `seller`
- **Response**: Returns a JSON array of auction cars from a specific seller.

### `getAuctionSoldItems`
- **Description**: Retrieves a list of auction cars sold by a specific seller.
- **HTTP Method**: GET
- **Route**: `/pastauctions/:seller`
- **Parameters**: `seller`
- **Response**: Returns a JSON array of sold auction cars from a specific seller.

### `updateAuctionItem`
- **Description**: Updates an auction car's details by its ID.
- **HTTP Method**: PATCH
- **Route**: `/updateauction/:id`
- **Parameters**: `id` (Auction ID)
- **Request Body Parameters**: Details of the new highest bidder
- **Response**: Returns the updated auction car as a JSON object.

## Auction Model (AuctionModel.js)

The Auction Model defines the schema for storing auction car data in the application's database.

### Schema Fields
- `brand`: Brand of the car.
- `model`: Model of the car.
- `colour`: Car's colour.
- `fuel_type`: Type of fuel used.
- `mileage`: Mileage of the car.
- `buyout_price`: Buyout price of the car.
- `starting_bid`: Initial bid price.
- `reserve_price`: Reserve price.
- `ending_time`: End time of the auction.
- `description`: Description of the car.
- `years_used`: Number of years the car has been used.
- `registration_date`: Date of registration.
- `category`: Category.
- `new_used`: Boolean indicating if the car is new or used.
- `images`: An array of image URLs.
- `seller`: Seller's ID.
- `sold`: Boolean indicating if the car is sold.
- `highestBidder`: ID of the highest bidder.

## Example Usage

Here is an example of how to use the Auction Controller endpoints in your application:

```javascript
// Make HTTP requests to the endpoints described in the controller documentation.
// For example:
// GET /auctions
// POST /auctions
// GET /auctions/:id
// ...