
let apiKey, container, searchBox, lastSearch, submitBtn, tag, url, inputValue, img, farmId, serverId, id, secret, photoUrl, errorParagraph, time;
apiKey = "";

container = document.getElementById("container");
searchBox = document.getElementById("searchBox");
lastSearch = document.getElementById("lastSearch");
submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", search);
searchBox.addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		submitBtn.click();
		submitBtn.focus();
	}
});

function search(){
	time = setTimeout(function(){
		lastSearch.innerHTML ="Have patience, please. The pictures are on their way.";
	}, 1000);

	while(container.firstChild) { 
            container.removeChild(container.firstChild); 
    } 
	if (searchBox.value === ""){
		inputValue = "null"
	} else {
		inputValue = searchBox.value;
	}

	tag = inputValue;
	url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&tags="+ tag + "&format=json&nojsoncallback=1";

	fetch(url)
	  .then(response => {
	  	clearTimeout(time);
	  	console.log("innan response");
	    return response.json()
	  })
	  .then(data => {
	  	if(data===null){
	  		console.log("funkar inte");
	  	}else{
	    data.photos.photo.forEach(photoObj => {
	    	console.log("efter response allt är bra");
		    img = document.createElement("img");
		    farmId = photoObj.farm;
		    serverId = photoObj.server;
		    id = photoObj.id;
		    secret = photoObj.secret;
		    photoUrl = "https://farm" + farmId + ".static.flickr.com/" + serverId + "/" + id + "_" + secret + "_m.jpg";
		    img.src = photoUrl;
		    img.alt = "image containing the tag: " + inputValue;
		    container.appendChild(img);
	    })
	  
	  	lastSearch.innerHTML = "Last search was: " + inputValue;
		searchBox.value = "";
		submitBtn.blur();
		searchBox.focus();
		console.log("allt funkar");
	}
	  })
	  .catch(err => {
	  	clearTimeout(time);
	  	console.log("Google this to solve problem: " + err);
	  	lastSearch.innerHTML = "Something is wrong";
	  });
};


