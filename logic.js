//Logic for Studio Ghibli API
//https://ghibliapi.herokuapp.com/

const movie_posters=['./images/castle_in_the_sky.jpg', './images/grave_of_fireflies.jpg','./images/my-neighbor-totoro.jpg',
'./images/Kiki.jpg','./images/Only_Yesterday.jpg','./images/Porco_Rosso.jpg','./images/Pom_Poko.jpg','./images/Whisper_of_the_Heart.jpg',
'./images/Princess_Mononoke.jpg','./images/My_Neighbors_the_Yamadas.jpg','./images/Spirited_Away.png','./images/The_Cat_Returns.jpg',
'./images/Howls_Moving_Castle.jpg','./images/earthsea.jpg','./images/Ponyo.jpg','./images/Arrietty.jpg','./images/From_Up_on_Poppy_Hill.jpg',
'./images/The_Wind_Rises.jpg','./images/The_Tale_of_the_Princess_Kaguya.jpg','./images/When_Marnie_Was_There.jpg'];


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
        var count=0
        data.forEach(element => {

            var location = document.getElementById('info');
            var c = document.createElement('div');
            c.className="card col-lg-3 col-md-3 col-sm-12";
            var cb = document.createElement('div');
            cb.className="card-body";

            //make image element
            var image = document.createElement('img');
            image.className = "card-img-top"
            image.alt= element.title;
            image.id=count;

            //make title element
            var title = document.createElement('h5');
            title.className='card-title';
            var movie_title = document.createTextNode(element.title);

            //director and producer
            var direc_produc = document.createElement('p');
            direc_produc.className='card-subtitle text-muted';
            var info = document.createTextNode('Release Date: '+element.release_date);

            //make description element
            var description = document.createElement('p');
            description.className='card-text';
            var movie_description = document.createTextNode(element.description);
            
            description.appendChild(movie_description);
            title.appendChild(movie_title);
            direc_produc.appendChild(info);
            cb.appendChild(image);
            cb.appendChild(title);
            cb.appendChild(direc_produc);
            cb.appendChild(description);
            c.appendChild(cb);
            location.appendChild(c);

            assignPictures(count);

            count++;
        });
    }
    )
    .catch(err=>{
        console.log(err)
    })
}

function assignPictures(num){
    //assigns each card an image
    var card = document.getElementById(num);
    card.src = movie_posters[num];
}