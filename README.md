# Users Service

### Server-side setup

#### 1. Setup Environment Variables

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Enter your desired ```PORT```

#### 2. Setup dependencies

1. Install dependencies by running the following command from the root directory:

	```
	$ npm install
	```
    
#### 3. Start server

1. Start the server by running the following command from the root directory:

    ```
    $ npm start
    ```
2. Your server is now live at ```http://localhost:PORT```

### Dropping the database

1. Run the following command from the root directory:

    ```
    $ npm run drop
    ```

### Seeding database (This is not necessary for the service to be working)

1. In `development.env` enter the path to the directory where CSV data files live, in `DATA_PATH`.
2. Change filenames on line 9 and 10 in `seed.js` to correspond to CSV data filenames.
3. Run `seed.js` with the following command from the root directory:

	```
	$ node server/seed.js
	```