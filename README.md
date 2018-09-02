Trying hands on Meteor JS. 
Trying to establish best practises by building a premier project. 
Temporary Project, might be deleted soon.

### Accomplishment

 - Understood Meteor JS Concept. Meteor JS is a great, and unique framework. 
 Had previous knowledge in Loopback JS, Express JS, and the concept of API
 as server-side architecture confused me initially. Meteor JS Server is NOT
 basically the regular API structure out there
 
 - Understood Meteor RPC Calls
 - Organisation of actions as Services for clean code
 - Using central constant repository for RPC method signatures instead of 
 passing in string 
 directly. Maintenance and Organisation of RPC gets better.
 
 - Created a Helper method to suitably 'Enumify' objects for cleaner approach
 to calling Meteor RPC methods. (Planning on making an atmosphere-library out
 of this)
 
# Tasks Completed
- Can Register
- Can Login
- Can create Post, only when logged in
- Can read post, even as a visitor
- Can update Post, only by owner


### Todos

- Ability delete Post, only by owner
- Make a pagination for post list
- Ability to comment for each post
- Ability to delete Comment as Post Owner or Comment Owner
- Reactive comments
- Style all pages with material design

- Use GraphQL
- Use Grapher to establish relationships

- Try easify on the project
- Try React Molecule: on the project

- Clean organisation of styling elements

- Write MORE Tests
 - Check all Access Controls to prevent unauthorized CRUD actions by wrong users. 
 Example, If a user supplies a valid Id but different User Id, he can edit others'
 post

- On updating a document, Make it possible to edit just a single value, instead
of forcing all values to be sent and updated

- Do a test deploy, and test leak of secret environment variables
 
 # Credit
 Most of my Client Side UI pages and components were from this repository:
 https://github.com/Elitemd/final_boss_project