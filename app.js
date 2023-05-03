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
var port = 3000;

var con = mysql.createConnection({host, user, database});

con.connect(function(err){
    if (err) throw err;
    console.log("connected to "+database);
});

//body parser
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

//urls
// app.get("/update", function(req, res){
//     res.render("update");
//     //TODO this page should have a name field, radio button for name/connection, image
// })

// app.get("/delete", function(req, res){
//     res.render("delete");
//     //TODO only needs a person field
// })

//TODO Redo the home page so: it downloads all the names and then does buttons


//Insert function
app.get("/insert", function(req, res) {
    res.render("insert");
});
app.post("/insert", function(req, res){
    var newname = req.body.new_name;
    var extname = req.body.existing_name;

    var newid =''; var extid=''; var filename;

    //insert new name into people table
    var q = "INSERT INTO people (name) VALUES (\'"+newname+"\');";
    console.log(q);
    con.query(q, function (error, results) {
        if (error) throw error;
    });

    //get existing person ID
    q = "SELECT id FROM people WHERE name=\'"+extname+"\';";
    console.log(q);
    con.query(q, function(error, results) {
        if (error) throw error;
        extid = '' + results[0].id;
        console.log(extid);
        console.log(results[0].id)
    });

    //get new person ID
    q = "SELECT id FROM people WHERE name=\'"+newname+"\';";
    console.log(q);
    con.query(q, function(error, results) {
        if (error) throw error;
        newid = '' + results[0].id;
        console.log(newid);
        console.log(results[0].id)
    });
    
    //create the photo file name
    if (newid < extid)
    {   filename = ''+newid+'-'+extid+'.jpg';}
    else
    {   filename = ''+extid+'-'+newid+'.jpg';}


    //insert connections
    q = "INSERT INTO connections(p1id, p2id, filename) VALUES("+extid+", "+newid+",\'"+filename+"\'),("+newid+", "+extid+",\'"+filename+"\');";
    console.log(q);
    con.query(q, function (error, results) {
        if (error) throw error;
        
    })

    //rename file
    q = "SELECT filename FROM connections WHERE p1id ="+extid+" AND p2id ="+newid+";";
    console.log(q);
    con.query(q, function(error, results) {
        if (error) throw error;
        res.render("insert2",{data:results});
    });
});

//Search function
app.get("/search", function(req, res) {
    res.render("search");
});
app.post("/search", function(req, res){
    var searcht = req.body.search_term;

    var q = "SELECT name FROM people WHERE name LIKE  '%"+searcht+"%'  ORDER BY name ASC ;";
    console.log(q);
    con.query(q, function (error, results) {
        if (error) throw error;
        console.log({data: results});
        if(results.length == 0)
            res.render("search_result", {data: "no matching names"});
        else
        {   
            res.render("search_result", {data: results});
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

//listen
app.listen(port, function(){
    console.log('listening at '+port);
})