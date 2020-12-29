# PokeChat
![Project license](https://img.shields.io/apm/l/vim-mode?style=plastic)

A Discord inspired chat application using Node.js and with Pokemon Theme live on http://pokechat-app.herokuapp.com/

# Setup

To use it first we need to download Node.js
Download node from [here](https://nodejs.org/en/download/)

Once Node is downloaded and setup properly now we need to start Command Prompt

To check if Node is installed just type node and u will see something like the image below the version may vary

<p align="center">
  <img width="460" height="100" src="https://user-images.githubusercontent.com/42001739/83345057-48978700-a32c-11ea-94ed-837646b56d9b.png">
</p>

To check npm version type ```npm -v``` in the command prompt 

# Start Using:
Open Command Prompt and Create a folder for example ```PokeChat```

Change your working Directory to that new folder

```cd Pokechat```

- Now we need to start with first command  ```npm init```   which  Starts npm

      Some information will be asked like package name, author, license, etc. Fill it as you want

      In the entry point name it server.js(you can use any name but if you are cloning the repository I have used it.)

      Once this is done a package.json will be created

- We now need to install dependencies type ```npm install express moment socket.io``` 
      
      Express is web framework for Node.js
      moment.js is used to get date time
      socket.io enables realtime, bi-directional communication between web clients and servers.

- We need a developer dependency that is Nodemon which keeps our server running when developing so we dont need to restart back the server if there are some changes in the code

      ```npm install -D nodemon```


Once you install all of it. Open ```package.json``` and you will see that all the dependencies are there.

- Now to setup Nodemon

      Open package.json file change and there you will find "scripts" which will look like
      
 
    ```Javascript
      "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
      }
    ```
  
  
      Change it to code below
  
  
    ```JavaScript
      "scripts": {
      "start": "node server",
      "dev": "nodemon server"
      }
    ```
  
  
      Here start will be node entrypointFILENAME and dev is nodemon entrypointFILENAME
      
## This completes the setup

- Now to run just type ```npm run dev```

