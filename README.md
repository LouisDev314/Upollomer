# Upollomer

Nurture entrepreneurship

------

<u>v1.0</u>

This is the init version of Upollomer, basic framework

**<u>Notes</u>**

- state management is often used as a frontend framework by React.js/ Angular, etc.
- express-session is for local storage only -> in production mode, need session store

**<u>Node.js disadvantages</u>**

- Due to single-thread property, can't handle dense computation (have to wait for event loop)
- Shortage in communicating among multithread processing program (can't do multiplex -> render frontend while doing computation at the backend)
- Node.js is better for logically simple but I/O is frequent, NOT complicated logic
- 

**<u>Node.js insufficient</u>**

1. Recovery of the server after fixing bugs without shutting down
2. Log file function (access & error log)
   - access log: log every req, include IP address, access time and path, server response and proxy string
   - error log: write errors to the log stream

3. Multi-threading (single-thread property of Node.js will limit throughput while the req amount is huge & waste of efficacy)
4. Script to start & stop server
5. Port sharing <- reverse proxy to achieve port sharing based on function variable name

***<u>Solutions</u>***

2. Morgan & Winston
3. cluster -> inter-process program port reuse & 
4. 

**<u>Aim</u>**

- 

**<u>Task</u>**

1. Login & Register

   a. allow Google/ Facebook strategy apart from local strategy

   b. choose region of identity

2. Authentication to allow create project

   a. the project creator automatically include region

   b. choose category of the Idea on the same Create page

3. User's own page

   a. settings

   b. check & manage My Idea

4. **Selection boxes dynamically selected on Ideas index page**

   [^]: Sort of Solved

5. **Get value from selection box -> import to Schema**

6. Add a Map selection box pair for project creation & project browse

7. Invite co-dreamer to an Idea

8. Send request to join an Idea

   Provide text-space to write anything want to introduce

9. Instant chat system

10. Development Tips page

11. Crowd funding function

12. Online store (?)

**<u>Verification & Security</u>**

1. username restriction
2. pw length & restrictions
3. verify email via code
4. OAuth <- cybersecurity
5. limit amount of db query
6. add cache mechanism
7. 

