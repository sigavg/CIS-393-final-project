//express
var express = require('express');
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//mysql + connection
var mysql = require('mysql');

var host = 'localhost';
var user = 'root';
var database = 'final393';

var con = mysql.createConnection({host, user, database});

con.connect(function(err){
    if (err) throw err;
    console.log("connected");
});

//body parser
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

//urls


app.get("/insert", function(req, res){
    res.render("insert");
    //TODO this page has to have a name field, file field (jpg only), and connection field
})

app.get("/update", function(req, res){
    res.render("update");
    //TODO this page should have a name field, radio button for name/connection, image
})

app.get("/delete", function(req, res){
    res.render("delete");
    //TODO only needs a person field
})

//TODO Redo the home page so: it  



//Search function get
app.get("/search", function(req, res) {
    res.render("search");
});


//Search function post
app.post("/search", function(req, res){
    console.log(req.body.search_term);
    var searcht = req.body.search_term;
    console.log("Searched: "+searcht)
    var q = "SELECT name FROM people WHERE name LIKE  '%"+searcht+"%'  ORDER BY name ASC ;";
    
    con.query(q, function (error, results) {
        if (error) throw error;
        console.log({data: results});
        if(results.length == 0)
            res.render("search_result", {data: "no matching names"});
        else
        {   
            res.render("search_result", {data: results});

            // var msg = 'people: \n';
            // for(x of results)
            // {
            //     msg += x.name + '\n';
            // }
            // res.send(msg);
        }
    });
});


//display all
app.get("/display", function(req, res){
    var q = 'SELECT id, name FROM people;';
    con.query(q, function (error, results) {
        if (error) throw error;
        
        res.render("display", {data:results});
    });
});


app.listen(3000, function(){
    console.log('listening');
})