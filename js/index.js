function signup(){
    var email = document.getElementById('exampleInputEmail3').value;
    var password = document.getElementById('exampleInputPassword3').value;
    var users = [];

    if(JSON.parse(localStorage.getItem('users')) !== null){
        users = JSON.parse(localStorage.getItem('users'));
        const isUserPresent = users.some((o) => o.email === email);
        if(isUserPresent){
            document.getElementById('errormsg').innerHTML = "Users already exists! Either Login or Signup with new email!";
            return false;
        }
        else{
            document.getElementById('errormsg').innerHTML = '';
        }
    }
    users.push({"email":email,"password":password});

    // console.log(users);
    localStorage.setItem('users',JSON.stringify(users));
    sessionStorage.setItem('user',JSON.stringify({"email":email,"password":password}));
    return true;
}

function login(){
    var email = document.getElementById('InputEmail3').value;
    var password = document.getElementById('InputPassword3').value;
    var users = JSON.parse(localStorage.getItem('users'));

    const isUserPresent = users.find((o) => o.email === email);
    if(isUserPresent){
        if(isUserPresent.password === password){
            sessionStorage.setItem('user',JSON.stringify(isUserPresent));
            return true;
        }
    }
    document.getElementById('errorlogin').innerHTML = "Incorrect user mail or password";
    return false;   
}

function logout(){
    sessionStorage.clear();
    location.href = '../index.html'
}

function isUserLoggedIn(nav,error,login){
    var user = sessionStorage.getItem('user');

    //console.log(user,nav,error,login);
    if(user){
        document.getElementById(nav).className += " d-block";
        document.getElementById(error).className += " d-block";
        document.getElementById(login).className += " d-none";
        return true;
    }
    else{
        document.getElementById(nav).className += " d-none";
        document.getElementById(error).className += " d-none";
        document.getElementById(login).className += " d-block";
        return false;
    }
}

function getAllBlogs(){
    var blogs = JSON.parse(localStorage.getItem('blogs'));

    if(blogs.length==0){
        document.getElementById('homeerror').className += " d-block";
    }
    else{
        document.getElementById('homeerror').className += " d-none";
        displayBlogsList("blogs",blogs);
    }

}

function getMyBlogs(){

    var blogs = JSON.parse(localStorage.getItem('blogs'));

    var user = JSON.parse(sessionStorage.getItem('user')).email;

    const userBlogs = blogs.filter((blog) => blog.author === user.split('@')[0]);

    // console.log(userBlogs);

    if(userBlogs.length==0){
        document.getElementById('error').className += " d-block";
    }
    else{
        document.getElementById('error').className += " d-none";
        displayBlogsList("userblog",userBlogs);
    }

}


function displayBlogsList(containerName, blogs){

    var mainContainer = document.getElementById(containerName);

    var titlediv = document.createElement('h1');
    titlediv.className = "container mb-3";

    var hr = document.createElement('hr');
    hr.className = "mb-4";

    if(containerName === "blogs"){        
        titlediv.innerHTML = "Blogs";       
    }
    else if(containerName === "userblog"){
        titlediv.innerHTML = "My Blogs";
    }

    mainContainer.appendChild(titlediv);
    mainContainer.appendChild(hr);

    for(var i=0;i<blogs.length;i++){

        var div = document.createElement("div");
        div.className = "col-12 col-md-4 p-2";

        var cardContainer = document.createElement("div");
        cardContainer.className = "card";
        
        var images = document.createElement('img');
        images.className = "card-img-top mx-auto";
        images.src = (blogs[i].images);
        images.height = "230";

        var cardBody = document.createElement('div');
        cardBody.className = "card-body";

        var cardTitle = document.createElement('h3');
        cardTitle.className = "card-title";
        cardTitle.innerHTML = blogs[i].title;

        var cardText = document.createElement('p');
        cardText.className = "card-text container";
        cardText.innerHTML = blogs[i].description;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        var cardFooter = document.createElement('div');
        cardFooter.className = "card-footer d-flex";

        if(containerName === "blogs"){

            var icons = document.createElement('div');
            icons.className = "col";

            var likeIcon = document.createElement('span');
            likeIcon.className = "fa fa-thumbs-up";
            likeIcon.style.fontSize = "x-large";
            likeIcon.style.cursor = "pointer";
            likeIcon.id = "l"+i;
            likeIcon.addEventListener('click',function(){ 
                blogs[this.id[1]].likes += 1;
                localStorage.setItem('blogs',JSON.stringify(blogs));
                document.getElementById(this.id).style.color = "blue";
                document.getElementById(this.id).style.pointerEvents = "none";
                document.getElementById("d"+this.id[1]).style.pointerEvents = "none";
            });

            var dislikeIcon = document.createElement('span');
            dislikeIcon.className = "ms-3 fa fa-thumbs-down fa-flip-horizontal";
            dislikeIcon.id = "d"+i;
            dislikeIcon.style.fontSize = "x-large";
            dislikeIcon.style.cursor = "pointer";
            dislikeIcon.addEventListener('click',function(){ 
                blogs[this.id[1]].dislikes += 1;
                localStorage.setItem('blogs',JSON.stringify(blogs));
                document.getElementById(this.id).style.color = "red";
                document.getElementById(this.id).style.pointerEvents = "none";
                document.getElementById("l"+this.id[1]).style.pointerEvents = "none";
            });

            icons.appendChild(likeIcon);
            icons.appendChild(dislikeIcon)

            var author = document.createElement('h6');
            author.className = "text-end col";
            author.innerHTML = "- " + blogs[i].author;

            cardFooter.appendChild(icons);
            cardFooter.appendChild(author);

        }
        else if(containerName === "userblog"){

            var iconsstat = document.createElement('div');
            iconsstat.className = "col";

            var likeIcon = document.createElement('span');
            likeIcon.className = "fa fa-thumbs-up me-2";
            likeIcon.style.fontSize = "x-large";
            likeIcon.style.color = "blue";

            var likes = document.createElement('span');
            likes.innerHTML = blogs[i].likes;
            likes.style.fontSize = "x-large";

            var dislikeIcon = document.createElement('span');
            dislikeIcon.className = "fa fa-thumbs-down ms-4 me-2";
            dislikeIcon.style.fontSize = "x-large";
            dislikeIcon.style.color = "red";

            var dislikes = document.createElement('span');
            dislikes.innerHTML = blogs[i].dislikes;
            dislikes.style.fontSize = "x-large";

            iconsstat.appendChild(likeIcon);
            iconsstat.appendChild(likes);
            iconsstat.appendChild(dislikeIcon);
            iconsstat.appendChild(dislikes);

            var del = document.createElement('span');
            del.className = "fa fa-trash col text-end me-2";
            del.style.fontSize = "xx-large";
            del.style.cursor = "pointer";
            del.id = i;
            del.addEventListener('click',function(){
                if(confirm("Are you sure to delete this blog")){
                    // console.log(this.id);
                    blogs.splice(this.id,1);
                    localStorage.setItem('blogs',JSON.stringify(blogs));
                    window.location.reload();
                }
            });

            cardFooter.appendChild(iconsstat);
            cardFooter.appendChild(del);

        }

        cardContainer.appendChild(images);
        cardContainer.appendChild(cardBody);
        cardContainer.appendChild(cardFooter);

        div.appendChild(cardContainer);

        mainContainer.appendChild(div);
    }

}

var src;

function getUrl(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
    
        reader.addEventListener(
          "load",
          function(event) {
            src = event.target.result;
            // console.log(src)
          },
          false
        );
        reader.readAsDataURL(input.files[0]);
    }
    
}

function publish(){
    var user = JSON.parse(sessionStorage.getItem('user')).email;
    var blogs = [];

    var today = new Date();
    var dateTime = today.getFullYear() + '-' + (today.getMonth()+1) + '-'+today.getDate() + ' ' + today.getHours() + ":" + 
                    today.getMinutes() + ":" + today.getSeconds();

    if(JSON.parse(localStorage.getItem('blogs')) !== null){
        blogs = JSON.parse(localStorage.getItem('blogs'));
    }

    if(src){

        blogs.push({
            "title" : document.getElementById('title').value,
            "description" : document.getElementById('description').value,
            "author" : user.split('@')[0],
            "likes" : 0,
            "dislikes" : 0,
            "images" : src,
            "createdAt" : dateTime
        })

        localStorage.setItem('blogs',JSON.stringify(blogs));
    }
}
