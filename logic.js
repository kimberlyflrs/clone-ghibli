//Logic for Studio Ghibli API
//https://ghibliapi.herokuapp.com/
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
        data.forEach(element => {

            var location = document.getElementById('info');
            var c = document.createElement('div');
            c.className="card";
            var cb = document.createElement('div');
            cb.className="card-body";

            //make title element
            var title = document.createElement('h5');
            title.className='card-title';
            var movie_title = document.createTextNode(element.title);

            //make description element
            var description = document.createElement('p');
            description.className='card-text';
            var movie_description = document.createTextNode(element.description);
            
            description.appendChild(movie_description);
            title.appendChild(movie_title);
            cb.appendChild(title);
            cb.appendChild(description);
            c.appendChild(cb);
            location.appendChild(c);
        });
    }
    )
    .catch(err=>{
        console.log(err)
    })
}