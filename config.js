/* ==========================================================================
   EVERYTHING YOU'LL WANT TO EDIT LIVES IN THIS FILE.
   You never need to touch index.html, styles.css or app.js.
   ========================================================================== */

window.BIRTHDAY = {
  // ---- Her ---------------------------------------------------------------
  herName: "my love",
  // Her birthday as YYYY-MM-DD. The calendar opens on this month and marks the
  // day with a little heart. Leave "" to open on the current month.
  birthday: "",

  // ---- Words -------------------------------------------------------------
  introMessage:
    "Another year of you, and I'm the lucky one who gets to celebrate it. " +
    "I want your day to be exactly what you love, so I need a little help from you...",

  // ---- How her answers reach you ----------------------------------------
  // Fill in at least one. Empty ones are hidden on the last screen.
  contact: {
    phone: "",   // e.g. "4075551234"     -> "Text me your answers" button
    email: ""    // e.g. "you@example.com" -> "Email me your answers" button
  },
  // OPTIONAL, recommended once the site is online: make a free form at
  // https://formspree.io and paste its URL here. Her answers are emailed to you
  // automatically the moment she reaches the last screen.
  // e.g. "https://formspree.io/f/abcdwxyz"
  formspreeEndpoint: "",

  // ---- Photos & GIFs -----------------------------------------------------
  // Drop files into the /photos folder with these names, or change the names
  // here to match yours. GIFs work great for the cute reaction spots.
  // Use "cat:1", "cat:2" or "cat:3" to show one of the party-hat cats below
  // instead of a file. Empty photo spots fall back to the cats too.
  media: {
    intro: ["photos/us-1.jpg", "photos/us-2.jpg", "photos/us-3.jpg"], // Happy Birthday screen
    ask:   "cat:1",   // "Will you let me spoil you?"
    no:    "cat:3",   // the "There is no NOOOOO" pop-up
    date:  "cat:2",   // the calendar step
    final: "cat:1"    // "It's a date, my love!"
  },

  // ---- The birthday cat --------------------------------------------------
  // Each cat photo gets a drawn party hat. hat x/y = where the bottom of the
  // hat sits (in % of the photo), rot = tilt in degrees, size = hat width in %.
  // mouth = where the party blower comes out in the confetti animation.
  cats: [
    { src: "photos/cat-1.jpg", hat: { x: 55, y: 30, rot: 27, size: 36 }, mouth: { x: 38, y: 69 } },
    { src: "photos/cat-2.jpg", hat: { x: 52, y: 22, rot: 5,  size: 40 }, mouth: { x: 47, y: 61 } },
    { src: "photos/cat-3.jpg", hat: { x: 43, y: 21, rot: -7, size: 37 }, mouth: { x: 51, y: 61 } }
  ],
  blowerCat: 1,   // which cat (1-3) pops up to blow confetti

  // ---- The choices -------------------------------------------------------
  // icon can be: utensils, coffee, fish, flame, wine, home, spa, palette, sun,
  // gamepad, museum, star, film, heart, popcorn
  dinner: [
    { name: "Italian",         icon: "utensils" },
    { name: "Sushi",           icon: "fish" },
    { name: "Steakhouse",      icon: "flame" },
    { name: "Tapas & Wine",    icon: "wine" },
    { name: "Homemade by me",  icon: "home" },
    { name: "Birthday Brunch", icon: "coffee" }
  ],
  activity: [
    { name: "Spa Day",          icon: "spa" },
    { name: "Pottery Class",    icon: "palette" },
    { name: "Sunset Picnic",    icon: "sun" },
    { name: "Arcade & Bowling", icon: "gamepad" },
    { name: "Museum Date",      icon: "museum" },
    { name: "Stargazing",       icon: "star" }
  ],
  movies: [
    "The Notebook",
    "La La Land",
    "Pride and Prejudice",
    "About Time",
    "Crazy Rich Asians",
    "Past Lives",
    "10 Things I Hate About You"
  ]
};
