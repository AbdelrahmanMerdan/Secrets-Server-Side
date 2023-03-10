# Secrets, The Server Side!
Secrets is a Journal Entry website that allows users to create &amp; store personal journals with customized covers. Users can create multiple journals, each with its own unique title. Entries are private and stored for later use and viewing. It's a great way to document one's thoughts, feelings and experiences. <a href = https://abdelrahmanmerdan.github.io/Secrets-Journal-Entry/> The website is now live and ready for the world to use, come and check it out! </a>
<hr>
<h1> How it was built </h1>
The programs backend was built using JavaScript, Node.js, MongoDB, Railway app and GitHub Pages. JavaScript was used to add interactivity and dynamic behavior to the website. Node.js was used to build the backend logic of the website and connect it to the front-end using Railway app.  Railway app was utilized to manage my own APIs, it made it simple to connect to data sources, create endpoints, and access the data from anywhere in the world. MongoDB was used to store the information sent by the user in a secure place where it can be accessed at any time. Finally , I used GitHub Pages to host the website. The full list of everything used is below:

<ul>
<li>Javascript</li>
<li>Nodejs</li>
<li>MongoDB</li>
<li>Railway app</li>
<li>Github Pages</li>
</ul>

<hr>
<h1> How it works!</h1>
When a user signs up to the website, a new user is created and sent to the MongoDB server. This information includes their username, password, and a list of journal entrys. 
<br>
<br>
<img src="images/mongo-245.png" alt="Alt text" title="Optional title">

When the user attempts to create a journal, the information that is typed in is sent to an endpoint that checks the database to see if the user alraedy has a journal with the same title. If a prexisting journal exists, then the user will be prompted to change the title, if not then the database will be updated with the new entry. Once the user goes back to their homepage, information will be sent to another endpoint where it enters the database to retrieve the list of journals. The journals are then displayed onto the homepage with its unique cover.
<br>
<br>
<img src="images/mongo-25.png" alt="Alt text" title="Optional title">
<br>
The interaction between the front end and back end allows for information to be updated, stored and verified at all steps of the user experience. This allows for seemless connectivity between the user and their journals.
<hr>
<h1> The Front-end </h1>
<a href = https://github.com/AbdelrahmanMerdan/Secrets-Journal-Entry> The repository to the front-end of the project can be found here! </a>
