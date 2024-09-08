# Summary

### Problem

There are no open-source plug-and-play solutions for virtual currencies on the market. Developers have to create their own systems from scratch and deal with reliability, performance, law and other problems. This significantly increases development cost.

### Solution

Open source system for adding custom virtual currency to one’s project. Developers only need to deploy the system and configure it via web GUI (similar to Jenkins one).

Also developers get a lot of metrics and charts inside of the GUI.

# Stakeholders

1. Game Developers  
2. Game Investors  
3. Players  
4. Banking organizations

# Features

1. Payment service. Our service tends to make all the way of currency movement to be as fast as possible and secured.  
2. Authorization (access to API of our service). Our service has its own authorization mechanism to restrict management logic.  
3. Storage for users’ transactions, requests, responses, balances. This data will be stored in different databases.  
4. Frontend Admin Panel. Separate front’end solution for easier administration.  
5. API (REST, RPC, …). We use this solution for user and service link.  
6. Service modularity. Different Middlewares, plugins after transaction complete.

# Constraints

1. Middleware has to be written according to in-game rules of currency existence and movement.  
2. Every plugin has to be executed as a separate process