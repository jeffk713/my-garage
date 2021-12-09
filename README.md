# My Garage

## Contents

- [General info](#general-info)
- [Sample image](#sample-image)
- [Tech stack](#tech-stack)
- [Set up](#set-up)

## General info

- Web app where you can easily manage your vehicle's maintenance or repair

- ** Shop page is under construction **

## Sample images

Homepage when not signed in
![sample1](https://github.com/jeffk713/my-garage/blob/master/sample-images/image1.png?raw=true)
My page
![sample2](https://github.com/jeffk713/my-garage/blob/master/sample-images/image2.png?raw=true)
Vehicle detail page
![sample3](https://github.com/jeffk713/my-garage/blob/master/sample-images/image3.png?raw=true)

## Tech stack

- Front-end: React.js; Redux-thunk implemented to handle async function
- Back-end: Node.js w/ Express.js
- Database: NoSQL; MongoDB w/ Mongoose

## Set up

To run this project:

1. Create `.env` by using `.env.example`

```bash
cp .env.example .env
```

2. Insert your Mongo_DB Atlas URL in `.env`

```
MONGO_URL= [YOUR_MONGO_DB_ATLAS_URL]
```

3. Install server dependencies:

```bash
$ npm install
```

4. Install client dependencies:

```bash
$ cd client
$ npm install
```

5. Run Express and UI from root directory:

```bash
$ npm run dev
```
