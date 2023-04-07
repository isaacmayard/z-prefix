# Isaac Mayard Z-Prefix

***Best Car Website Ever***

### The Setup

**1. Fork & Clone** 

* Fork this repository in GitHub and clone it locally onto your machine.
	* https://github.com/isaacmayard/z-prefix
	* Once cloned:
			* open the repo with VSCode

**2. Set up your Database**

* Open Docker Desktop

* Next, open your preferred terminal **NOTE: be sure the terminal you use to open your back-end is the same terminal you use for your front-end application**

* Run the following command to pull down a Dockerized Postgres image from the cloud `docker pull postgres`

* Next, you will need to create the directories that will house your database data by running this command `mkdir -p $HOME/docker/volumes/postgres`

* Run the following command to start up a Docker Postgres container instance of the image that was pulled `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

* This should populate a PSQL Container ID. Then run the following command `docker exec -it <first 3 characters of the PSQL-Container-ID> bash`

* Run the following command `psql -U postgres`

* When you type in `\l` it will populate a list of databases. You will need to add a database to that list of databases for this application. Run the following command `CREATE DATABASE prefix;` **NOTE: Don't forget your semicolon! If you do, immediately after you hit enter, add the semi-colon and hit enter again**

* Go to your VSCode and open your terminal

**3. Back-end**

**NOTE: be sure to change directory to the back-end**

* Type `npm install`

* You should see a `knexfile.js` and a `.env` file. If your `.env` file is not there, copy paste the following *CONNECTION_STRING='postgres://USER:PASSWORD@localhost/prefix'* into a new file named '.env' in the back-end directory. Be sure to replace the USER:PASSWORD with your postgres Username and Password, i.e.(*CONNECTION_STRING='postgres://postgres:docker@localhost/prefix'*)

* Next, you will need to run the following command `npx knex migrate:latest`

* Once that is complete, run the following command `npx knex seed:run`

* Run `npm start` to start running your back-end 

**4. Front-end**

**NOTE: be sure to change directory to the front-end**

* Type `npm install` to gain all the dependencies required for this application

* run `npm start` to start your server 

## How to use The Best Car Inventory Website Ever

**Visitor Functionality**

> On the homepage, you will be able to view all currently available inventory in the database. I used faker data to seed car names and manufacturers, quantities, and a stylish monopoly car for each available inventory item and future one's created.

> On the homepage, you will be able to select an item by clicking on the image or on the title header. After selection you will be able to see that specific item's details, as well as making note of the item ID in the URL box at the top. This will be helpful for if you need to delete items.

> Along with the command post information, you will have a drop down list of each nearby city where you will see various statistics such as school ratings, cost of living (basic housing allowance for the area), and crime rates.

> Click on the "Best Car Website Ever" title to be redirected back to the homepage.

**Admin Functionality**

> As a new visitor to the page, you can optionally register as an inventory admin.

> Once you are logged in, the "Welcome, ${USER}" header will be clickable and take you to the page of items that you've added.

> As an admin, you will be able to add, update and delete inventory items, as well as delete users, by clicking on the admin panel and following the instructions.

> Once you've successfully performed a CRUD function in the admin page, you can opt to either go back to the homepage or the personal page, by clicking on the respective header.

**Rubric Rundown**

> The UI has the ability for visitors and admins to view all items and any one item.

> API-Server communication is fully functional.

> Server has GET/PUT/POST/DELETE routes that are fully functional and accessible via the admin panel when logged in.

> DB can successfully perform all CRUD applications as specified in line above.

> Authentication is fully functional, and user information is stored in the DB. Users who are logged in can see items that they've created in their personal page.



**Key Notes**

> When you login as an existing user, you need to click twice or hit enter twice in order to be successfully logged in. This is due to the async functionality of the fetch happening with your credentials. If I had more time, I would fix this small issue as well as implement a cookie upon successful login that would keep your credentials persistent between page refreshes. Currently, if you refresh the page, you have to start over again, but functionality is all there.