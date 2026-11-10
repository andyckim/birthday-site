/* ==========================================================================
   EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
   You never need to touch index.html, styles.css or app.js.
   ========================================================================== */

window.BIRTHDAY = {
  // ---- Names -------------------------------------------------------------
  herName: "My Love",       // shown on the intro screen

  // ---- How her answers reach you ----------------------------------------
  // Fill in at least one. Empty ones are hidden on the final screen.
  contact: {
    phone: "",              // e.g. "4075551234"  -> "Text my picks" button
    email: ""               // e.g. "you@example.com" -> "Email my picks" button
  },
  // OPTIONAL, recommended once the site is live on the internet:
  // make a free form at https://formspree.io, paste its endpoint here, and her
  // picks are emailed to you automatically the moment she finishes.
  // e.g. "https://formspree.io/f/abcdwxyz"
  formspreeEndpoint: "",

  // ---- Words -------------------------------------------------------------
  introMessage:
    "Another year of you, and I'm the lucky one who gets to celebrate it. " +
    "I'm planning your day, and I want it to be exactly what you love. " +
    "Pick three things for me: where we eat, what we do, and what we watch.",
  finaleMessage:
    "Leave the rest to me. All you have to do is show up and be the birthday girl.",

  // ---- Photos ------------------------------------------------------------
  // Drop your pictures into the /photos folder using these exact file names,
  // OR change the names below to match your files. Any photo that's missing
  // shows a little "Add photo" frame with the file name it's waiting for.
  photos: {
    intro: [
      { src: "photos/intro-1.jpg", caption: "us" },
      { src: "photos/intro-2.jpg", caption: "my favorite day" },
      { src: "photos/intro-3.jpg", caption: "you & me" }
    ],
    dinner:   { src: "photos/dinner.jpg",   caption: "date night" },
    activity: { src: "photos/activity.jpg", caption: "adventures" },
    movie:    { src: "photos/movie.jpg",    caption: "movie nights" },
    // The scrolling film strip on the "anything else?" screen. Add as many as you like.
    gallery: [
      { src: "photos/gallery-1.jpg", caption: "" },
      { src: "photos/gallery-2.jpg", caption: "" },
      { src: "photos/gallery-3.jpg", caption: "" },
      { src: "photos/gallery-4.jpg", caption: "" },
      { src: "photos/gallery-5.jpg", caption: "" },
      { src: "photos/gallery-6.jpg", caption: "" },
      { src: "photos/gallery-7.jpg", caption: "" },
      { src: "photos/gallery-8.jpg", caption: "" }
    ],
    finale: [
      { src: "photos/finale-1.jpg", caption: "" },
      { src: "photos/finale-2.jpg", caption: "" },
      { src: "photos/finale-3.jpg", caption: "happy birthday" }
    ]
  },

  // ---- The three choices -------------------------------------------------
  // Add, remove or reword options freely. Every step also gets a
  // "Something else" card where she can type her own idea.
  steps: [
    {
      id: "dinner",
      label: "Dinner",
      title: "Where should we eat?",
      subtitle: "Dinner is on me. Pick the mood and I'll book the table.",
      options: [
        { id: "italian", title: "Candlelit Italian", tag: "Cozy",      text: "Fresh pasta, a bottle of red, and one dessert we pretend to share." },
        { id: "sushi",   title: "Sushi Omakase",     tag: "Special",   text: "Sit at the counter and let the chef surprise us, course after course." },
        { id: "steak",   title: "Classic Steakhouse",tag: "Dressy",    text: "Get dressed up, order something perfectly cooked, and a fancy cocktail." },
        { id: "tapas",   title: "Rooftop Tapas",     tag: "Lively",    text: "Small plates, sangria, and the city lights after sunset." },
        { id: "home",    title: "I Cook for You",    tag: "Homemade",  text: "Your favorite meal made by me, flowers on the table, no reservation needed." },
        { id: "brunch",  title: "Birthday Brunch",   tag: "Daytime",   text: "Make it a daytime date: pancakes, mimosas and absolutely no alarm." }
      ]
    },
    {
      id: "activity",
      label: "Activity",
      title: "What should we do?",
      subtitle: "Something just for the two of us. Choose the adventure.",
      options: [
        { id: "spa",     title: "Spa Day",          tag: "Relax",    text: "Massages, fluffy robes, and doing absolutely nothing all afternoon." },
        { id: "pottery", title: "Pottery Class",    tag: "Creative", text: "Get our hands messy and make something we keep forever." },
        { id: "picnic",  title: "Sunset Picnic",    tag: "Outdoors", text: "A blanket, your favorite snacks, and a golden-hour walk." },
        { id: "arcade",  title: "Arcade & Bowling", tag: "Playful",  text: "Friendly competition. Loser buys dessert." },
        { id: "museum",  title: "Museum & Coffee",  tag: "Slow",     text: "Wander a gallery hand in hand, then a long coffee after." },
        { id: "stars",   title: "Stargazing",       tag: "Dreamy",   text: "Drive somewhere dark with blankets and hot cocoa." }
      ]
    },
    {
      id: "movie",
      label: "Movie",
      title: "And the movie?",
      subtitle: "Pick a vibe, name a film if you have one in mind, and tell me where we're watching.",
      options: [
        { id: "romcom",   title: "Rom-Com",              tag: "Sweet",    text: "Something warm that makes us laugh and a little bit cry." },
        { id: "thriller", title: "Edge of Our Seats",    tag: "Thrilling",text: "A mystery or thriller we argue about on the drive home." },
        { id: "animated", title: "Animated & Cozy",      tag: "Comfort",  text: "Blankets, popcorn, and something gorgeous to look at." },
        { id: "scary",    title: "Something Scary",      tag: "Spooky",   text: "You pick the scariest one. I'll be brave for both of us." },
        { id: "classic",  title: "An All-Time Favorite", tag: "Classic",  text: "The one you could watch a hundred times." },
        { id: "new",      title: "Whatever's New",       tag: "Premiere", text: "The biggest new release, best seats in the house." }
      ],
      // Extra questions on the movie step only
      where: [
        { id: "theater", title: "At the theater" },
        { id: "home",    title: "Cozy at home" }
      ]
    }
  ]
};
