;(function(){
  // Properties
  const root = document.querySelector('.root');
  const quote = document.querySelector('blockquote');
  const nav = root.querySelector('nav');
  const like = root.querySelector('.like');
  const likeCount = like.querySelector('span');
  const likeIcon = like.querySelector('i');
  const quoteText = quote.querySelector('p');
  const cite = quote.querySelector('cite');
  const forward = nav.querySelector('span:last-child');
  const backward = nav.querySelector('span:first-child');

  let quoteCardInstances = [];
  let currentIndex = 0;

  const cardProto = {
    toggleLikes () {
      if(this.isLiked) {
        this.likes -= 1;
      } else {
        this.likes +=1;
      }
      this.isLiked = !this.isLiked;
      this.renderLikes();
    },
    render(direction) {

      quoteText.setAttribute('class','');
      if (direction && direction === 'prev') {
        quote.classList.add('slide-in-prev');
      } else {
        quote.classList.add('slide-in-next');
      }

      const wordCount = this.quote.split(" ").length;
      ( wordCount >= 12 && wordCount <= 15 ) && quoteText.classList.add("fitted-minor");
      ( wordCount >= 16 && wordCount <= 19) && quoteText.classList.add("fitted");
      ( wordCount >= 20 ) && quoteText.classList.add("fitted-major");

      // console.log(loadedClasses);

      quoteText.textContent = this.quote;
      cite.textContent =  this.cite;
      this.renderLikes()
    },
    renderLikes() {
      likeCount.textContent = this.likes;
      likeIcon.classList[(this.isLiked) ? 'add': 'remove']('liked');
    }
  };

  // XHR
  //"http://ron-swanson-quotes.herokuapp.com/v2/quotes/55"
  // "GET, /data/MOCK_ronswanson.json, response_handler"
  const getQuotes = (method, url, callback ) => {
    //test for current protocol
    if(window.location.protocol !== 'http:') {
      callback(localFileProtocol);
    } else {
      let xhr = (window.ActiveXObject)
      ? new ActiveXObject("Microsoft.XMLHTTP")
      : (XMLHttpRequest && new XMLHttpRequest()) || null;

      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", 'application/json');

      xhr.onload = (event) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
        } else {
          console.error(xhr.responseText);
        }

      };
      xhr.onerror = (event) => console.error(xhr.statusText);
      xhr.send(null);
    }
  }

  //METHODs
  const nav_handler = (event) => {
    let direction = event.target.getAttribute('data-direction');
    switch (direction) {
      case 'next':
      // Infinite carousel check
      quote.classList.add('slide-out-next');
      (currentIndex + 1 < quoteCardInstances.length)
      ? currentIndex += 1 : currentIndex = 0;
      break;
      case 'prev':
      // Infinite carousel check
      console.log('prev')
      quote.setAttribute('class', '');
      quote.classList.add('slide-out-prev');
      // quote.classList.add('slide-out-next');
      (currentIndex - 1 < 0 )
      ? currentIndex = quoteCardInstances.length - 1 : currentIndex -= 1 ;
      break;
      default: break;
    }

    quote.addEventListener('animationend', (event) => {
      if(event.animationName === 'slide-out-next') {
        quote.classList.remove('slide-out-next');
        quoteCardInstances[currentIndex].render('next');
      }
      if(event.animationName === 'slide-out-prev') {
        quote.classList.remove('slide-out-prev');
        quoteCardInstances[currentIndex].render('prev');
      }

      if (event.animationName === 'slide-in-prev' ||
      event.animationName === 'slide-in-next') {
        quote.classList.remove('slide-in-next');
        quote.classList.remove('slide-in-prev');
      }
    })
  };

  // Event listener
  const setEvents = () => {
    like.addEventListener('click', function (event) { quoteCardInstances[currentIndex].toggleLikes(); } , false);
    nav.addEventListener('click', nav_handler, false);
  };

  // Event Handlers
  const response_handler = function (resp) {
    quoteCardInstances = resp.map( (quote) => {
      return  Object.create(cardProto, {
        id : { value: quote.id },
        likes: { writable: true, value: quote.likes },
        isLiked: { writable: true, value: false },
        quote: { value: quote.quote },
        cite: { value: '- ' + quote.firstName + ' ' + quote.lastName  }
      });
    });

    //adds first quote card to DOM
    quoteCardInstances[currentIndex].render();
    //bind events to DOM
    setEvents();
  };

  const initalize = () => {
    getQuotes("GET", "/api/ronswanson.json", response_handler);
  };


  // mock if ran from file:// protoco
  var localFileProtocol = [
    {
      "id":0,
      "quote":"Crying: acceptable at funerals and the Grand Canyon.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":385
    },
    {
      "id":1,
      "quote":"I'm a simple man. I like pretty, dark-haired women, and breakfast food.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":14
    },
    {
      "id":2,
      "quote":"Strippers do nothing for me…but I will take a free breakfast buffet anytime, anyplace.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":191
    },
    {
      "id":3,
      "quote":"When people get a little too chummy with me I like to call them by the wrong name to let them know I don't really care about them.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":462
    },
    {
      "id":4,
      "quote":"Keep your tears in your eyes where they belong.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":448
    },
    {
      "id":5,
      "quote":"My only official recommendations are US Army-issued mustache trimmers, Morton's Salt, and the C.R. Lawrence Fein two inch axe-style scraper oscillating knife blade.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":331
    },
    {
      "id":6,
      "quote":"Capitalism: God's way of determining who is smart and who is poor.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":188
    },
    {
      "id":7,
      "quote":"There are three acceptable haircuts: high and tight, crew cut, buzz cut.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":143
    },
    {
      "id":8,
      "quote":"I hate everything.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":255
    },
    {
      "id":9,
      "quote":"Honor: if you need it defined, you don't have it.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":112
    },
    {
      "id":10,
      "quote":"Under my tutelage, you will grow from boys to men. From men into gladiators. And from gladiators into Swansons.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":114
    },
    {
      "id":11,
      "quote":"Clear alcohols are for rich women on diets.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":64
    },
    {
      "id":12,
      "quote":"What's cholesterol?",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":126
    },
    {
      "id":13,
      "quote":"Never half-ass two things. Whole-ass one thing.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":366
    },
    {
      "id":14,
      "quote":"Breakfast food can serve many purposes.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":126
    },
    {
      "id":15,
      "quote":"I believe luck is a concept invented by the weak to explain their failures.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":2
    },
    {
      "id":17,
      "quote":"I love nothing.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":318
    },
    {
      "id":18,
      "quote":"One rage every three months is permitted. Try not to hurt anyone who doesn't deserve it.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":178
    },
    {
      "id":19,
      "quote":"There is only one bad word: taxes.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":324
    },
    {
      "id":20,
      "quote":"I'll take that steak to go. Please and thank you.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":346
    },
    {
      "id":21,
      "quote":"America: The only country that matters. If you want to experience other ‘cultures,’ use an atlas or a ham radio.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":405
    },
    {
      "id":22,
      "quote":"Children are terrible artists and artists are crooks.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":483
    },
    {
      "id":23,
      "quote":"Any dog under fifty pounds is a cat and cats are useless.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":144
    },
    {
      "id":24,
      "quote":"It's always a good idea to demonstrate to your coworkers that you are capable of withstanding a tremendous amount of pain.",
      "firstName":"Ron",
      "lastName":"Swanson",
      "likes":419
    }
  ];
  initalize();
})()
