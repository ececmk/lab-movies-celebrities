const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .then((celebrityFromDB) => {
      const movieData = {
        celebrityArr: celebrityFromDB
      }
      res.render("movies/new-movie", movieData);
    })
    .catch((error) => {
      console.log("Error getting movies from DB", error);
      next(error);
    });
})
router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect("/movies")
  
      })
      .catch((error) => {
        console.log("Error creating", error);
        next(error);
  
      });
  })
  
  router.get("/movies/:movieId", (req, res) => {
    Movie.findById(req.params.movieId)
      .populate('cast')
      .then((movieDetails) => {
        res.render("movies/movie-details", { mDetail: movieDetails });
      })
      .catch((error) => {
        console.log("Error getting movie details from DB", error);
        next(error);
      });
  })
  
  router.get("/movies", (req, res) => {
  
    Movie.find()
      .then((allMoviesFromDB) => {
        res.render("movies/movies", { allMoviesArr: allMoviesFromDB })
      })
      .catch((error) => {
        console.log("Error getting movies from DB", error);
        next(error);
      });
  })
  router.post("/movies/:movieId/delete", (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((error) => {
        console.log("Error deleting movie  from DB", error);
        next(error);
      });
  })
  router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect("/movies")
  
      })
      .catch((error) => {
        console.log("Error creating", error);
        next(error);
  
      });
  })
  
  router.get("/movies/:movieId", (req, res) => {
    Movie.findById(req.params.movieId)
      .populate('cast')
      .then((movieDetails) => {
        res.render("movies/movie-details", { mDetail: movieDetails });
      })
      .catch((error) => {
        console.log("Error getting movie details from DB", error);
        next(error);
      });
  })
  
  router.get("/movies", (req, res) => {
  
    Movie.find()
      .then((allMoviesFromDB) => {
        res.render("movies/movies", { allMoviesArr: allMoviesFromDB })
      })
      .catch((error) => {
        console.log("Error getting movies from DB", error);
        next(error);
      });
  })
  router.post("/movies/:movieId/delete", (req, res) => {
    Movie.findById(req.params.movieId)
    .then(foundMovie => {
        Celebrity.find()
        .then(allCelebs => {
          allCelebs.forEach(oneCeleb => {
            foundMovie.cast.forEach(oneCastMember => {
              if(oneCeleb._id.equals(oneCastMember)){
                oneCeleb.isInCast = true;
              }
            })
          })
          res.render('movies/edit-movie', { movie: foundMovie, allCelebs })
        })
      })
      .catch( err => console.log("Error while getting the movie for the edit form: ", err))
    })

    router.get("/movies/:movieId/edit", (req, res) => {
    Movie.findById(req.params.movieId)
    .populate("cast")
    .then(foundMovie => {
        console.log("test", foundMovie);
        res.render('./movies/edit-movie', { movie: foundMovie})
    }
       
       )
    .catch( err => console.log("Error while getting the movie for the edit form: ", err))
   
        })
        
    
    
  
  
  
  
  

module.exports = router;
