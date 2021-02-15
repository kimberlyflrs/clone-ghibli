//Logic for Studio Ghibli API Clone
//https://ghibliapi.herokuapp.com/

var api_data;

function getMovieTitles(){
    //gets the movie titles
    fetch('https://ghibliapi.herokuapp.com/films')
    .then(response=>{
            return response.json()
        }
    )
    .then(data=>{
        //do something with data here
        console.log(data)
        api_data=data;
        create_movies(api_data);
        })
    
    
    .catch(err=>{
        console.log(err)
    })
}

//maybe add a sorting function by title and year
//maybe get an array of the child component and then arrange it based on card-title h5
//element.release_date and element.title are the ones that need sorting
//maybe save a copy for the object somewhere

function stitle(){
    api_data.sort(sort_title);
    clear();
    create_movies(api_data);
    var title = document.getElementById('title');
    title.className= "dropdown-item active";
    var year = document.getElementById('year');
    year.className= "dropdown-item";
    var rating = document.getElementById('rating');
    rating.className= "dropdown-item";
}

function year(){
    api_data.sort(sort_release);
    clear();
    create_movies(api_data);
    var title = document.getElementById('title');
    title.className= "dropdown-item";
    var year = document.getElementById('year');
    year.className= "dropdown-item active";
    var rating = document.getElementById('rating');
    rating.className= "dropdown-item";
}

function rating(){
    api_data.sort(sort_rating);
    console.log(api_data);  
    clear();
    create_movies(api_data);
    var title = document.getElementById('title');
    title.className= "dropdown-item";
    var year = document.getElementById('year');
    year.className= "dropdown-item";
    var rating = document.getElementById('rating');
    rating.className= "dropdown-item active";
}

function sort_title(a,b){
    //sorts by the title
    const releaseA= a.title;
    const releaseB = b.title;

    let compare=0;
    if(releaseA>releaseB){
        compare= 1;
    }
    else if(releaseA<releaseB){
        compare=-1;
    }
    return compare;
}

function sort_release(a,b){
    //sorts by the release year
    const releaseA= a.release_date;
    const releaseB = b.release_date;

    let compare=0;
    if(releaseA>releaseB){
        compare= 1;
    }
    else if(releaseA<releaseB){
        compare=-1;
    }
    return compare;
}

function sort_rating(a,b){
    //sorts by the movie rating
    const releaseA= parseInt(a.rt_score);
    const releaseB = parseInt(b.rt_score);

    let compare=0;
    if(releaseB>releaseA){
        compare= 1;
    }
    else if(releaseB<releaseA){
        compare=-1;
    }
    return compare;
}

function create_pic(title){
    //takes the title of the movie to make
    //url of image
    var replaced = title.replace("'","");
    var link = replaced.split(' ').join('_');
    return './images/'+link+'.jpg';
}

function create_movies(info){
    var count=0;
    info.forEach(element => {

        create_pic(element.title);

        var location = document.getElementById('info');
        var c = document.createElement('div');
        c.className="card col-lg-3 col-md-3 col-sm-12 shadow-sm";
        var cb = document.createElement('div');
        cb.className="card-body";

        //make image element
        var image = document.createElement('img');
        image.className = "card-img-top movie_pic"
        image.alt= element.title;
        image.id=count;
        image.src= create_pic(element.title);

        //make title element
        var title = document.createElement('h5');
        title.className='card-title';
        var movie_title = document.createTextNode(element.title);

        //release_date
        var release = document.createElement('p');
        release.className='card-subtitle text-muted';
        var info = document.createTextNode('Release Date: '+element.release_date);

        //rt_score
        var rating = document.createElement('p');
        rating.className='card-subtitle text-muted';
        var rate_info = document.createTextNode('Rating: '+element.rt_score);


        //make description element
        var description = document.createElement('p');
        description.className='card-text';
        var movie_description = document.createTextNode(element.description);
        
        //make external link button
        var link = document.createElement('a');
        link.href = create_link(element.title);
        var button = document.createElement('button');
        button.className="btn-brown btn";
        var more = document.createTextNode('Learn More');

        description.appendChild(movie_description);
        title.appendChild(movie_title);
        release.appendChild(info);
        rating.appendChild(rate_info);
        button.appendChild(more);
        link.appendChild(button);
        cb.appendChild(image);
        cb.appendChild(title);
        cb.appendChild(release);
        cb.appendChild(rating);
        cb.appendChild(description);
        cb.appendChild(link);
        c.appendChild(cb);
        location.appendChild(c);

        count++;
})
};

function clear(){
    //clears all of the movie cards
    var movies = document.getElementById('info');

    while (movies.hasChildNodes()){
        movies.removeChild(movies.firstChild);
    }
}

function create_link(title){
    if (title == "Castle in the Sky"){
        title = "Laputa Castle in the Sky";
    }
    title = title.toLowerCase().split(" ").join("").split("'").join("");
    var link = "https://www.studioghibli.com.au/" + title +"/";
    return link;
}