var add= document.getElementById("add");
var noofmentee;

str_count = localStorage.getItem("count");
if (str_count == null || str_count == "null"){
      noofmentee = 0;
    } else {
      noofmentee = parseInt(str_count);
    }

let data = localStorage.getItem('mentees') ? JSON.parse(localStorage.getItem('mentees')) : [];
let data2 = localStorage.getItem('rating') ? JSON.parse(localStorage.getItem('rating')) : [];


localStorage.setItem('mentees', JSON.stringify(data));
localStorage.setItem('rating', JSON.stringify(data2));


const mentee = JSON.parse(localStorage.getItem('mentees'));
const ratinglist = JSON.parse(localStorage.getItem('rating'));

console.log(data);



function colorassigner(rating,id){
	var element = document.getElementsByClassName(id);
	console.log(element);
	if(rating==10){
		var red = 0;
		var green = 255;
	}
	if(rating>=5 && rating<10){
		var red= Math.floor(Math.random()*100);
		var green = Math.floor(Math.random()*245);
	}
	if (rating>1 && rating<5){
		var red = Math.floor(Math.random()*245);
		var green = Math.floor(Math.random()*100);
	}
	if (rating==1){
		var red = 255;
		var green = 0;
	}
	var rgbToHex = function (rgb) { 
  	var hex = Number(rgb).toString(16);
  	if (hex.length < 2) {
    	   hex = "0" + hex;
  	}
  		return hex;
	};
	var redhex = rgbToHex(red);
	var greenhex = rgbToHex(green);
	var bluehex = rgbToHex(0);

	var hex ="#"+redhex+greenhex+bluehex;

	console.log("rgb(red,green,0)")
	element[0].style.backgroundColor = hex;
	element[1].style.backgroundColor = hex;
}




function onKeyDown(evt) {
  if (evt.keyCode==13){
  	return 1;
  }
}
function editname(value){
	var textarea = document.createElement("textarea");
	var text = document.createElement("p");

	text.appendChild(document.createTextNode("Enter the new name and hit Enter"));

	textarea.addEventListener("keydown",function(evt){
		if (evt.keyCode==13){
			var newname = this.value;

			var i=0;
			for (i=0;i<noofmentee;i++){
				if (mentee[i].nameof == value){
					mentee[i].nameof = newname;
					var l1 =document.getElementById(value);
					l1.textContent = newname;
					l1.setAttribute("id",newname);
					l1.className = newname;
					console.log(l1.className);
					var l2 = document.getElementsByClassName(value);
					console.log(l2);
					l2[0].className = newname;
					localStorage.setItem("mentees",JSON.stringify(mentee));
					break;
				}
			}
			var myNode = document.getElementById("editbox");
	    	while (myNode.firstChild) {
    			myNode.removeChild(myNode.firstChild);}
    		var myNode1 = document.getElementById("box");
	    	while (myNode1.firstChild) {
    			myNode1.removeChild(myNode1.firstChild);
			}
	  	}
	});
	document.getElementById("editbox").appendChild(text);
	document.getElementById("editbox").appendChild(textarea);


}

function box(value){
	var i=0;

	var myNode = document.getElementById("box");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	for (i=0;i<mentee.length;i++){
		console.log(value);
		console.log(mentee);
		if (mentee[i].nameof === value){
			var name = value;
			var rating = mentee[i].rating;
			var comment = mentee[i].comment;
			var edit = document.createElement("button");
			var delete1 = document.createElement("button");
			edit.setAttribute("id",value);
			delete1.setAttribute("id",value);

			edit.addEventListener("click",function(){editname(edit.getAttribute("id"));})
			delete1.addEventListener("click",function(){
				var myNode1 = document.getElementById("box");
	    			while (myNode1.firstChild) {
    			myNode1.removeChild(myNode1.firstChild);}
    			var id = this.getAttribute("id");
    			var element = document.getElementsByClassName(id);
    			console.log(element);
    			element[0].remove();
    			element[0].remove();
    			var i=0;
    			for(i=0;i<noofmentee;i++){
    				if(mentee[i].nameof==id){
    					break;
    				}
    			}
    			mentee.splice(i,i+1);
    			localStorage.setItem("mentees",JSON.stringify(mentee));
    			noofmentee--;
    			localStorage.setItem("count",noofmentee);
			})

			edit.appendChild(document.createTextNode("Edit"));
			delete1.appendChild(document.createTextNode("Delete"))

			document.getElementById("box").appendChild(document.createTextNode("Name:"+name+'\n'));
			document.getElementById("box").appendChild(document.createTextNode("Rating:"+rating+'\n'));
			document.getElementById("box").appendChild(document.createTextNode("Comments:"+comment));
			document.getElementById("box").appendChild(edit);
			document.getElementById("box").appendChild(delete1);
			return 1;
		}
	}
}

function listcreator(name){

	var li1 = document.createElement("li");
	var li2 = document.createElement("li");
	var i=0;
	for(i=0;i<mentee.length;i++){
		if(mentee[i].nameof==name){
			rating = mentee[i].rating;
		}
	}
	li1.setAttribute("id",name);
	li1.classList.add(name);
	li2.classList.add(name)	;

	li1.addEventListener("click",function(){var a=box(li1.getAttribute("id"));});



	li1.appendChild(document.createTextNode(name));
	li2.appendChild(document.createTextNode(rating));

	var ul1 = document.getElementById("namedisplay");
	var ul2 = document.getElementById("ratingdisplay");

	ul1.appendChild(li1);
	ul2.appendChild(li2);


	colorassigner(rating,li1.getAttribute("id"));

}
function addMentee(){
	var name = document.getElementById("name").value;
	var rating = document.getElementById("rating").value;
	var comment = document.getElementById("comment").value;

	console.log(mentee);

	mentee[noofmentee] = new Object();
	mentee[noofmentee].nameof = name;
	mentee[noofmentee].rating = rating;
	mentee[noofmentee].comment = comment;


	document.getElementById("name").value="";
	document.getElementById("rating").value="";
	document.getElementById("comment").value="";
	
	localStorage.setItem('mentees', JSON.stringify(mentee));
	listcreator(name);
	ratinglist.push(Number(rating));

	localStorage.setItem('rating' , JSON.stringify(ratinglist));

	noofmentee++;
	localStorage.setItem('count' , noofmentee);
	colorassigner(rating,name);
}
function sortlist(){
	ratinglist.sort(function(a, b) {
  	return a - b;});

	var myNode = document.getElementById("box");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	var myNode = document.getElementById("namedisplay");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	var myNode = document.getElementById("ratingdisplay");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	var i=0;var j=0;
	for (i=0;i<ratinglist.length;i++){
		for(j=0;j<noofmentee;j++){
			if(mentee[j].rating==ratinglist[i]){
				var name = mentee[j].nameof;
				
				listcreator(name);

				

			}
		}

	}




}

var i=0;
for(i=0;i<data.length;i++){
	listcreator(mentee[i].nameof);
}

add.addEventListener("click",addMentee);

var sort = document.getElementById("sort");
sort.addEventListener("click",sortlist);
