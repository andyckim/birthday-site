# Birthday Planner

A little website for her birthday: a pastel pink page with hearts floating up the background and one soft card that walks her through:

1. **Happy Birthday, my love!** with three photos of you two
2. **"Will you let me spoil you on your birthday?"** Yes / No. Pressing **No** pops up *There is no "NOOOOOO". You must come with me!*
3. **YAYYYYY! When shall we celebrate?** A calendar plus hour / minute / AM-PM
4. **Dinner** picks
5. **Activity** picks
6. **Movie** picks
7. **How excited are you?** slider
8. **It's a date, my love!** Her answers, plus buttons to send them to you

Each choice step also has a **Something else** option where she can type her own idea. Confetti, fade-in transitions and a step progress bar throughout.

No build step, no database. Plain HTML, CSS and JavaScript.

## Test it

Double-click `index.html`, or from this folder run `python3 -m http.server` and open http://localhost:8000.

Her answers are remembered in her browser, so a reload won't lose them.

## The birthday cat

Your cat, in a drawn party hat, shows up on the question screen, in the "There is no NOOOOO" pop-up, on the calendar step and on the final screen. When she taps **Yes**, a cat pops up from the bottom of the screen and blows a party horn full of confetti. On "It's a date", two cats do it from both corners.

- The photos are `photos/cat-1.jpg`, `cat-2.jpg`, `cat-3.jpg` (cropped from your iPhone pictures).
- The hat's position, tilt and size for each photo, and where the party horn comes out of the cat's mouth, are under `cats` in `config.js`, in percent of the photo. Nudge those numbers if a hat looks off.
- `blowerCat` picks which cat does the confetti.

## Add photos and GIFs

Put files in `photos/` with these names, or open `config.js` and change the names under `media`:

| Spot | Default |
|---|---|
| Happy Birthday screen (3 photos of you two) | `us-1.jpg`, `us-2.jpg`, `us-3.jpg` |
| "Will you let me spoil you?" | `cat:1` |
| The "There is no NOOOOO" pop-up | `cat:3` |
| Calendar step | `cat:2` |
| "It's a date, my love!" | `cat:1` |

`cat:1` to `cat:3` show the party-hat cats. Replace any of them with a file path (`"photos/ask.gif"`) to use your own photo or GIF instead. Any photo spot that's still empty, like the three "us" photos until you add them, shows a party-hat cat so the page never looks broken. When you open the site from your own computer, those spots also show the file name they're waiting for.

Tip: convert iPhone `.HEIC` photos to `.jpg` and shrink them to about 1200px on the long side so the site loads fast.

## Edit words and options

Everything is in `config.js`:

- `herName`, `introMessage`
- `birthday`: her birthday as `YYYY-MM-DD`. The calendar opens on that month and puts a little heart on the day.
- `dinner`, `activity`, `movies`: the choices. Add, remove or rename freely. Icons available: utensils, coffee, fish, flame, wine, home, spa, palette, sun, gamepad, museum, star, film, heart, popcorn.

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
styles.css   pastel look, floating hearts, transitions
app.js       the steps, calendar, "No" pop-up, the confetti cat, sending answers
config.js    <- everything you edit
photos/      <- your photos and GIFs (and the cat)
```

## Credits

The flow and visual style are adapted from [datebyte](https://github.com/0xneobyte/datebyte) by Tharushka Dinujaya, used under the MIT License (see `LICENSE`).
