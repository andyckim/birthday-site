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
  // Each step also gets a "Something else" option where she can type her own idea.
  // icon can be: utensils, coffee, fish, flame, wine, home, spa, palette, sun,
  // gamepad, museum, star, film, heart, popcorn
  // links show as small buttons under the option and open in a new tab.
  dinner: [
    { name: "La Cantine", sub: "Bushwick", icon: "utensils",
      links: [{ label: "Google reviews", url: "https://www.google.com/maps/search/?api=1&query=La+Cantine+60+Saint+Nicholas+Ave+Brooklyn+NY" }] },
    { name: "Bonnie's", sub: "Williamsburg", icon: "flame",
      links: [{ label: "Google reviews", url: "https://www.google.com/maps/search/?api=1&query=Bonnie%27s+Williamsburg+Brooklyn+NY" }] },
    { name: "Briscola Trattoria", sub: "Crown Heights", icon: "wine",
      links: [{ label: "Google reviews", url: "https://www.google.com/maps/search/?api=1&query=Briscola+Trattoria+Crown+Heights+Brooklyn+NY" }] },
    { name: "Homemade by me", sub: "Dinner at home", icon: "home" }
  ],
  activity: [
    { name: "Pottery Class",   icon: "palette" },
    { name: "Couples Massage", icon: "heart" },
    { name: "Korean Spa",      icon: "spa" }
  ],
  movies: [
    { name: "Harry Potter and the Chamber of Secrets", sub: "2002", icon: "film",
      links: [
        { label: "Trailer", url: "https://www.youtube.com/results?search_query=Harry+Potter+and+the+Chamber+of+Secrets+official+trailer" },
        { label: "About",   url: "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Chamber_of_Secrets_(film)" }
      ] },
    { name: "Being John Malkovich", sub: "1999", icon: "film",
      links: [
        { label: "Trailer", url: "https://www.youtube.com/results?search_query=Being+John+Malkovich+official+trailer" },
        { label: "About",   url: "https://en.wikipedia.org/wiki/Being_John_Malkovich" }
      ] },
    { name: "Big World", sub: "2024", icon: "film",
      links: [
        { label: "Trailer", url: "https://www.youtube.com/results?search_query=Big+World+2024+%E5%B0%8F%E5%B0%8F%E7%9A%84%E6%88%91+trailer" },
        { label: "About",   url: "https://en.wikipedia.org/wiki/Big_World_(film)" }
      ] }
  ]
};
