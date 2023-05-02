var people = [];
function person(name, connectionids)
{
    this.id = people.length;
    for(let indiv of people )
    {
        if (indiv.name === name)
        {
            //TODO exit constructor and delete new object 
        } 
    }
    this.name = name;
    this.connectionids = connectionids;
    //TODO go thru existing people and add their connection if it exists in new person's connectionids

    this.track = -1;

    people.push(this);
    console.log(name+" added");
}

new person("Kevin Bacon", [1, 5, 7]);
new person("Tom Hanks", [0, 2]);
new person("Barack Obama", [1, 3]);
new person("Donald Trump", [2, 4, 5, 10]);
new person("Brian Urlacher", [3, 6]);
new person("Sandra Bullock",[0, 1, 3]);
new person("Marcy Lesimple", [4, 11]);
new person("Chris Pratt",[0, 8, 9]);
new person("Wyatt Oleff",[7, 9, 11]);
new person("Michael Rooker",[7, 8]);
new person("Emmanuel Macron",[3]);
new person("Lauren Lesimple",[4, 6, 8]);



document.getElementById("calculatebtn").addEventListener("click", function()
{
    document.getElementById(parseInt("1")).innerHTML = "";
    document.getElementById(parseInt("2")).innerHTML = "";
    document.getElementById(parseInt("3")).innerHTML = "";
    document.getElementById(parseInt("4")).innerHTML = "";
    document.getElementById(parseInt("5")).innerHTML = "";
    document.getElementById(parseInt("6")).innerHTML = "";

    //person 1 id
    var p1 = document.getElementById('person1').value;
    for(let a of people)
    { if(a.name == p1) { p1id = a.id; break; }}
    console.log(people[p1id].name +" - "+ p1id)

    //person 2 id
    var p2 = document.getElementById('person2').value;
    for(let a of people)
    { if(a.name == p2) { p2id = a.id; break; }}
    console.log(people[p2id].name +" - "+ p2id)
    
    var result = BFS();
    var photos = pathDisplay(result);
    document.getElementById("answer").textContent = "They are separated by "+result+" degrees.";

    console.log(photos);
    var divid = 1;
    for (let a of photos)
    {
        document.getElementById(parseInt(divid)).innerHTML = a;
        divid++;
    }

    document.getElementById("calculatebtn").style.display = "none";
    document.getElementById("question").style.display= "none";
    document.getElementById("resetbtn").style.display="block";

})

document.getElementById("resetbtn").addEventListener("click", function()
{
    location.reload();
})

function BFS () 
{
    let queue = [];                                                 //queue for nodes being worked on

    var depths = [];                                                //array for depths of each person from source
    depths.length = people.length;                                  //make depth array same length as people array
    for(let a = 0; a < depths.length; a++) { depths[a] = 999;}      //fill depth array with 999 (value of path not found)

    let depth = 0;                                                  //initialize depth at 0
    depths[p1id]=depth;                                             //set source depth to depth
    p1id.track = 999;

    while(depth < people.length)                                    //iterate until depth reaches maximum possible...
    {
        depth++;                                                        //increment depth
        for(let a = 0; a < depths.length; a++)                          //in each existing depth...
        {
            if(depths[a] == depth-1)                                        //if a depth is equal to the previous depth, it means it was just added in the last iteration
            {
                for(let b = 0; b < people[a].connectionids.length; b++)         //go through the corresponding person's connections...
                {
                    if(!queue.includes(people[a].connectionids[b]))                 //if the queue does not already contain the id for that connection...
                    {
                        queue.push(people[a].connectionids[b]);                         //push the connection id into the queue
                        if(people[people[a].connectionids[b]].track < 0 && people[a].connectionids[b] != p1id) {
                        people[people[a].connectionids[b]].track = a; 
                        //console.log(people[people[a].connectionids[b]].name+" track set to "+people[people[a].connectionids[b]].track); 
                        }
                    }
                }
            }
        }

        for(let connectionid of queue)                                  //iterating through the queue...
        {
            if(depths[connectionid] == 999)                                 //if there are unfound depths for existing connections...
            {
                depths[connectionid] = depth;                                   //set to current depth
            }                                   
        }
        queue = [];                                                     //clear the queue of connections at this depth
    } //end while loop

    return depths[p2id];

} //end function

//TODO make result appear on screen
//TODO update github files

function pathDisplay (dist)
{
    // for(let i = 1; i < 7; i++)
    // {
    //     document.getElementById(parseInt(i)).innerHTML = "";
    // }
    let a = p2id;
    let pictures = [];
    let string, htmlstring;
    let count = 0;
    while (people[a].track != -1 && count < 20)
    {
        string = "Photos/";
        if(p1id == p2id)
        {
            string += p1id;
            string += "-"+people[p1id].connectionids[0];
            
        }
        else if(a > people[a].track)
        {
            string += people[a].track;
            string += "-"+a;
        }
        else
        {
            string += a;
            string += "-"+people[a].track;
        }
        string +=".jpg";

        htmlstring = `<img src="` + string +`" alt="photo">`;

        pictures.unshift(htmlstring);
        a = people[a].track;
        count++;
    }
    return pictures;
}









