# BankRoll
## An intuitive stock-tracking app for the casual investor

BankRoll is a simple stock-tracking app that allows users to add and follow the performance of their stocks in one place. Once an account is created, the user can search for any stock registered on the major exchanges using the built-in search bar, and see a graph of the stock's recent performance over ranges of 1 day, 1 week, 2 weeks, and 1 month. 

If the user wishes to track this stock for an extended period of time, they have the option of creating a stock list with their desired name, and can add as many stocks as they would like to this list. Each stock they add will appear in the stock bar at the top of the screen, and the current stock price and daily percent change will update for those stocks upon every data refresh. If they no longer wish to track the stock, they can simply click the `X` at the top right corner of the stock on the stock bar and it will be removed.

## Instructions for Use
1. Fork and Clone this repository
2. Navigate to this directory from the command line
3. Install dependencies by running an `npm install`
4. Once opened in your preferred code editor, host the site locally by running an `nodemon run server` from the command line

## Technologies Used
- ExpressJS
- MySQL Database Storage
- AWS RDS Database Hosting

## Additional Support Packages
- Sequelize Database Integration
- JWT Authentication
- BCrypt Password Hashing

## Planning and Initial Design

This project had relatively simple back-end requirements. The major focus initially was to gain experience working with SQL and relational databases, so the back end was simplified to allow for focus on that aspect. 

The first part of the back end that was built was for authentication. This provided ample experience working with sequelize and MySQL to work on the latter requirements, and was a necessary step in determining if this architecture would work for the time alotted and data storage required.

Once the foundation was set up, the requirements of the back end were determined through extensive front-end design. The following Entity Relationship Diagram was made to model the data structure:

### Entity Relationship Diagram (ERD)

![ERD](https://i.imgur.com/ilBZcGN.png)

The many-to-many relationship of lists to stocks (a list can have many stocks, a stock can belong to many lists) requires the use of a join table that connects the user that owns the list, to the list, to the stocks in that list. The advantage of this table is that a stock only needs to be added to the database once, and from there, each time it is added to another list a row is simply added to the join table. This supports scalability and efficiency as use increases.

### API Endpoints
List routes
- POST /lists - create a list. Body must include 'name' of list
- DELETE /lists/:name - delete a list. Name must be included as URL parameter
- GET /lists - show all lists
- GET /lists/:name - show a specific list. Name must be included as a URL parameter

Stock routes
- POST '/stocks' - create a stock. Body must include 'name' of stock, 'ticker' of stock, and 'listId' of the list it will be added to
- GET /stocks - show all stocks
- PATCH /stocks - remove a stock from a list. Body must include 'stockId' of stock to be removed from list and 'listId' of list to remove stock from

## Future Work
The majority of the future work will be dictated by front-end additions. As it stands now, this back end server is set up to support high volume of use in an organized manner. As users are added and more stocks are added to the database, the current setup will allow for efficient retrieval of information.

## Links
API: https://fathomless-wave-79069.herokuapp.com

Deployed Site: https://anthonyguariglia.github.io/bankroll

Front-End Repository: https://github.com/anthonyguariglia/bankroll