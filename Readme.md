## Creating a full stack application

# =======================================================================================================

# Vehicle Insurance Website

This application is meant to simulate buying auto insurance. An agent can log on, create or edit a quote, and offer policies.
Technologies involved are Mongo database, Express, ReactJS, Node, as well as mongoose, json web token, and redux.
October 22, 2018

# =======================================================================================================

# 10 steps to create secure registration and login

Step 0A: Initialize React application
$ npm init
Step 0B: Install dependencies and developer dependency that updates app after changes
$ npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
$ npm i -D nodemon

Step 1: Set up and run the server using Express (in server.js)

Step 2: Set up and connect to MongoDB through Mongoose (in server.js using config > keys.js)

Step 3: Develop route files with Express Router (in routes)

Step 4: Develop models (in models)

Step 5: Develop Registration (in users.js using server.js)
Step 5A: Bring in body parser and middlewear (in server.js)
Step 5B: Bring in gravatar and bcrypt and develop functionality (in routes > api > users)
Step 5C: Hash password (in routes > api > users)

Step 6: Develop Login (routes > api > users > login route)

Step 7: Develop json web token (in routes > api > users)

Step 8: Develop passport.
Step 8A: passport middleware (in server.js)
Step 8B: passport stratgey (in config > passport.js)

Step 9: Validation (in validation)
Step 9A: is empty
Step 9B: register and login

Step 10: Profit

# =======================================================================================================

## Start on insuracne app design

Step 11: Profile model (models > Profile)

Step 12: Profile routes (api > profile)

Step 12a: get current users profile route (api > profile > /)
step 12b: create or update users profile route (api > profile > /)

Step 13: Profile validation (validation > profile)

Step 14: more profile routes

# =======================================================================================================

## Start on Frontend

Step 15: create react app
$ npm i -g create-react-app
STep : make a react app in client folder
$ create-react-app client

# =======================================================================================================

# Insurance Application Design

## Design Walkthrough

An agent logs on
Agent sees a dashboard with pending and finished policies
Agent can click on a pending policy finished policy
Pending Policy Page will bring up the Transaction Page
Transaction Page will have Customers Details, Vechicle Details, Coverage Details.
On Form Submit, Coverage Package Details will be calculated
If New Buisness, there will be Bind Details as well
If Finished Policy, Transaction Summay will dispaly

---

## Design Walkthrough by Component

Agent logs in. Gets directed to

> Dashboard component (consists of customer search bar, list of policies, and list of quotes. also button to start new quote )
> list of customers quote component (ordered by most recent) (each cust. has name and address)
> Onclick of customer in customer quote list, agent is directed to:
> customer quote info component
> start new quote component
> quote history component (shows id, vech name)
> onclick previous quote
> quote history component (shows id, last saved, cust info, vech info, report status)
> open button
> onclick open button
> Customer info component (marital status, policy relationship, occupation, {licensce info: age, state}{address},{contact})
> Spouse info component
> Other household member component
> Consumer reports: credit
> Vehicle Information Component ({basic: vech type, year, make, model},{garage address}, {saftey: antilock breaks, automatic seatbelts, side airbags}, {other: annual miles, usage class, ownership status, purchase date, original owner, salvaged?})
> Driver usage component (between husband and wife)

# =================================================================================================================

# Other information

Dashboard pulls information from the profile routes
Profile needs to contain the info dashboard will display
I want the dashboard to display finished policies and pending quotes
therefore, i want profile to contain policy object and quote object
profile routes should include:

next steps
create quote and coverage and calculations routes
