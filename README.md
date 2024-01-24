# BSE Stock Price RESULT APP

This repository contains the code for a Stock Price View Application that accesses and manages data from the Bombay Stock Exchange (BSE). The application is built using Node.js and Express.js, with MongoDB atlas as the database.

## Project Structure

```plaintext
BSE/
|-- src/
|   |-- api/
|   |   |-- 50days/
|   |   |   |-- previous.js
|   |   |-- favourites/
|   |   |   |-- fcontrol.js
|   |   |-- particular/
|   |   |   |-- server.js
|   |   |-- stockController.js
|   |-- models/
|   |   |-- stock.js
|   |-- scripts/
|   |   |-- csv.js
|   |   |-- download.js
|-- index.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- .gitignore
```

## Installation and Setup

### NOTE:

- **If you are using the app for first time**
  - Then you should run .
    ```bash
      node downloadData.js
    ```
    This downloads required files for your operation.

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd BSE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root directory:

   ```plaintext
   MONGOURL=<your-mongodb-connection-string>
   ```

4. Run the application:

   ```bash
   node index.js
   
   ```
   

## API Usage

### Equities API

- **GET /api/top10**
  - Get the top 10 latest stocks.
  - Implemented cache for faster retreival
  
    Example:
    ```plaintext
    GET /api/top10
    ```

- **GET /api/StockByName/:name**
  - Get a stock by name.
  - 
    Example:
    ```plaintext
    GET /api/StockByName/:name
    ```
  - Inplace of :name enter the name of the stock

- **GET /api/history/:name**
  - Get stock price history list for UI graph.
  - Implemented cache for faster retreival
  
    Example:
    ```plaintext
    GET /api/history/:name 
    ```
  - Inplace of :name enter the name of the stock

- **GET /api/last50days**
  - Get the stocks details traded during last 50 days.
  - Implemented cache for faster retreival
  
    Example:
    ```plaintext
    GET /api/last50days
    ```

### Favourites API

- **GET /api/favourites/visit**
  - Get all favourite stocks. 

    Example:
    ```plaintext
    GET /api/favourites/visit
    ```

- **POST /api/favourites/add/:code**
  - Add a stock to favourites. 

    Example:
    ```plaintext
    POST /api/favourites/add/500378
    
    ```

- **DELETE /api/favourites/delete/:code**
  - Remove a stock from favourites. 

    Example:
    ```plaintext
    DELETE /api/favourites/delete/500378
    ```


