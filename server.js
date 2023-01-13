const express = require("express");
const app = express();
const port = 1337;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const MAIN_COOKIE = "jsbase";

app.get("/", (req, res) => {
  console.log("Cookies: ", req.cookies);
  res.send(`
    <h1>Secure SPA Demo</h1>
    <p>
    ${JSON.stringify(req.cookies)}
    </p>
    <button id="login">Login</button>
    <button id="logout">Logout</button>
    <h3>Test call API</h3>
    <button id="test">Test call API</button>
    <script src="/app.js"></script>
  `);
});

app.get("/token", (req, res) => {
  const accessToken = req.cookies[MAIN_COOKIE]?.accessToken || "";
  res.send({ accessToken });
});

app.get("/app.js", (req, res) => {
  res.type(".js");
  res.send(`
    const App = {
      accessToken: '',
      callApi(){
        
        alert("will call api with " + this.accessToken);
      },
      login(){
        fetch('http://localhost:${port}/login')
        .then((response) => response.json())
        .then((data) => {
          App.accessToken = data.accessToken;
          App.checkLoginState();
        });        
      },
      logout(){
        fetch('http://localhost:${port}/logout')
        .then((response) => {
          App.fetchToken();
          App.checkLoginState();
        });        
      },      
      checkLoginState(){
        if(App.accessToken){
          document.querySelector('#login').style.display = "none";
          document.querySelector('#logout').style.display = "block";
        }else{
          document.querySelector('#login').style.display = "block";
          document.querySelector('#logout').style.display = "none";          
        }
      },
      fetchToken(){
        fetch('http://localhost:${port}/token')
        .then((response) => response.json())
        .then((data) => {
          App.accessToken = data.accessToken;
          App.checkLoginState();
        });        
      },
      handleEvent(){
        App.fetchToken();
        
        document.querySelector('#test').addEventListener('click', () => {
          App.callApi();
        });
        document.querySelector('#login').addEventListener('click', () => {
          App.login();
        });  
        document.querySelector('#logout').addEventListener('click', () => {
          App.logout();
        });                
      }
    }
    App.handleEvent();
  `);
});

app.get("/logout", (req, res) => {
  // set cookie
  res.clearCookie(MAIN_COOKIE);
  res.status(204).send();
});

app.get("/login", (req, res) => {
  const accessToken = "token_" + Date.now();
  // set cookie
  res.cookie(
    MAIN_COOKIE,
    { accessToken },
    {
      expires: 0,
      httpOnly: true,
      secure: true,
    }
  );
  res.send({ accessToken });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
