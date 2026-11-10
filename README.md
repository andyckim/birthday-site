# Birthday Planner

A little website for her birthday: a pastel pink page with hearts floating up the background and one soft card that walks her through:

1. **Happy Birthday <3**, revealed top-down: the title, then one big party-hat cat, then the message and button while two more cats pop up around the page and keep hopping to new spots
2. **"Will you let me spoil you on your birthday?"** Yes / No. The **No** button runs away 3 or 4 times ("Nope!", "Too slow!", "Catch me!") while Yes grows, then gives up; pressing it pops up *There is no "NOOOOOO". You must come with me!*
3. **YAYYYYY! When shall we celebrate?** A calendar plus hour / minute / AM-PM. Tapping **Set our date!** sets off an explosion of about 200 roses
4. **Dinner** picks
5. **Activity** picks
6. **Movie** picks
7. **How excited are you?** slider
8. **It's a date, my love!** The two dogs snuggled inside a drawn heart, four love letters that open into polaroids of you two (hover on a computer, tap on a phone), her answers, plus buttons to send them to you

Each choice step also has a **Something else** option where she can type her own idea. Confetti, fade-in transitions and a step progress bar throughout.

No build step, no database. Plain HTML, CSS and JavaScript.

## Test it

Double-click `index.html`, or from this folder run `python3 -m http.server` and open http://localhost:8000.

Her answers are remembered in her browser, so a reload won't lose them.

## The birthday cat

Your cat, in a drawn party hat, shows up on the question screen, in the "There is no NOOOOO" pop-up, on the calendar step and on the final screen. When she taps **Yes**, a cat pops up from the bottom of the screen and blows a party horn full of confetti. On "It's a date", two cats do it from both corners.

- The photos are `photos/cat-1.jpg` to `cat-4.jpg` (cropped from your iPhone pictures).
- The last slide shows the two dogs (`photos/dog-white.jpg`, `dog-black.jpg`) in drawn crochet bucket hats: a pink piggy hat and a green froggy hat. Their positions are under `dogs` in `config.js`; `type` can be `pig` or `frog`.
- The hat's position, tilt and size for each photo, and where the party horn comes out of the cat's mouth, are under `cats` in `config.js`, in percent of the photo. Nudge those numbers if a hat looks off.
- `blowerCat` picks which cat does the confetti.

## Love letters

Four envelopes on the last slide open into polaroids with Sharpie-style captions. They're under `letters` in `config.js`: each has a photo (`photos/us-1.jpg` to `us-4.jpg`), a `caption` and a `date`.

| Photo | Caption | Date |
|---|---|---|
| `us-1.jpg` | New York | 7/31/26 |
| `us-2.jpg` | San Francisco | 11/1/26 |
| `us-3.jpg` | Lotta Wine | 10/30/26 |
| `us-4.jpg` | Atlanta | 4/26/26 |

## Add photos and GIFs

Put files in `photos/` with these names, or open `config.js` and change the names under `media`:

| Spot | Default |
|---|---|
| Happy Birthday screen, big center picture (`intro`) | `cat:2` |
| Cats popping up around the Happy Birthday screen (`introPoppers`) | `cat:1`, `cat:3` |
| "Will you let me spoil you?" | `cat:4` |
| The "There is no NOOOOO" pop-up | `cat:3` |
| Calendar step | `cat:1` |
| "It's a date, my love!" | `dogs`: the two dogs in crochet bucket hats |

`cat:1` to `cat:4` show the party-hat cats. Replace any of them with a file path (`"photos/ask.gif"`) to use your own photo or GIF instead. Any photo spot whose file is missing shows a party-hat cat so the page never looks broken. When you open the site from your own computer, those spots also show the file name they're waiting for.

Tip: convert iPhone `.HEIC` photos to `.jpg` and shrink them to about 1200px on the long side so the site loads fast.

## Edit words and options

Everything is in `config.js`:

- `herName`, `introMessage`
- `signature`: the footer reads "Made with <3 - Andy"
- `birthday`: her birthday as `YYYY-MM-DD`. The calendar opens on that month and puts a little heart on the day.
- `dinner`, `activity`, `movies`: the choices. Each option has a `name`, an optional `sub` line (neighborhood, year), an `icon`, and optional `links` that show as small buttons under it (Google reviews for the restaurants, Trailer and About for the movies). Add, remove or rename freely. Icons available: utensils, coffee, fish, flame, wine, home, spa, palette, sun, gamepad, museum, star, film, heart, popcorn.

## How you see her answers

No database. Pick one or more in `config.js`:

| Option | Setup | What happens |
|---|---|---|
| **Automatic email (recommended once it's online)** | Make a free form at [formspree.io](https://formspree.io), paste its URL into `formspreeEndpoint` | Her answers are emailed to you the moment she reaches the last screen |
| **Text** | `contact.phone` | A "Text me your answers" button opens her Messages app with the answers pre-written |
| **Email** | `contact.email` | Same, with her email app |
| **Copy** | Always on | Copies the answers so she can paste them anywhere |

What you get:

```
my love's birthday answers

Date: Sat, Nov 21 at 8:00 PM
Dinner: Sushi
Activity: Kayaking with manatees
Movie: La La Land
Excitement: 100/100
```

Formspree only works once the site is at a real web address, not a double-clicked file.

## Put it online (GitHub Pages)

Repo **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**. A minute later it's live at `https://andyckim.github.io/birthday-site/`. Pages on a private repo needs a paid GitHub plan; a public repo means anyone with the link can see the photos.

## Files

```
index.html   page shell
vendor/      confetti library (canvas-confetti, ISC license), bundled so it always loads
styles.css   pastel look, floating hearts, transitions
app.js       the steps, calendar, "No" pop-up, the confetti cat, sending answers
config.js    <- everything you edit
photos/      <- your photos and GIFs (and the cat)
```

## Credits

The flow and visual style are adapted from [datebyte](https://github.com/0xneobyte/datebyte) by Tharushka Dinujaya, used under the MIT License (see `LICENSE`).
