const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User with same username already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4))
});

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    var filtered_book;
    let i = 1;
    while(books[i]){
        if (books[i]["author"]===author) {
            filtered_book = books[i];
            break;
        }
        i++;
    }
   res.send(filtered_book)
});

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  var filtered_book;
    let i = 1;
    while(books[i]){
        if (books[i]["title"]===title) {
            filtered_book = books[i];
            break;
        }
        i++;
    }
   res.send(filtered_book)

});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
