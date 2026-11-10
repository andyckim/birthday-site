# Birthday Planner

A little website for her birthday. She opens it, taps a heart-shaped wax seal, gets a "Happy Birthday" intro, is asked whether she'll let you plan her day (the **No** button runs away, and catching it only gets her told that "No" is not an available answer), then picks:

1. **Dinner**
2. **An activity**
3. **A movie** (a vibe, an optional title, and theater vs. home)

…plus an excitement meter and an optional wish list. The last screen shows her picks as a ticket and gives her buttons to send them to you.

No build step, no database, no dependencies. Plain HTML, CSS and JavaScript.

## Test it on your computer

Double-click `index.html`. That's it.

(Or, from this folder, run `python3 -m http.server` and open http://localhost:8000.)

Her progress is remembered in her browser, so if she reloads, her choices are still there.

## Add your photos

1. Put your pictures in the `photos/` folder.
2. Name them to match the slots below, **or** open `config.js` and change the file names to match yours.

| Where it shows up | File name(s) |
|---|---|
| Three polaroids on the "Happy Birthday" screen | `intro-1.jpg`, `intro-2.jpg`, `intro-3.jpg` |
| Dinner page | `dinner.jpg` |
| Activity page | `activity.jpg` |
| Movie page | `movie.jpg` |
| Scrolling film strip ("anything else?" page) | `gallery-1.jpg` … `gallery-8.jpg` (add as many as you want in `config.js`) |
| Fan of photos on the final page | `finale-1.jpg`, `finale-2.jpg`, `finale-3.jpg` |

Any slot without a photo shows a dashed "Add photo" frame that names the file it's waiting for, so open the site and you'll see exactly where each one goes. `.png`, `.jpeg`, `.webp` and `.gif` work too; just use the right extension in `config.js`. Captions (the handwritten text under each polaroid) are also set in `config.js`. Photos are cropped to a 4:5 portrait polaroid, so portrait shots look best.

**Tip:** phone photos are huge. Resizing them to about 1200px on the long side keeps the site fast.

## Edit the words and options

Everything lives in `config.js`:

- `herName`: shown under "Happy Birthday"
- `introMessage`, `finaleMessage`: your notes to her
- `steps`: the dinner, activity and movie options. Add, remove or reword them. Each step also gets a "Something else" card where she can type her own idea.

## How you see what she picked

There's no database. Her answers reach you one of these ways (set them in `config.js`):

| Option | Setup | How it works |
|---|---|---|
| **Text** | `contact.phone: "4075551234"` | A "Text me your picks" button opens her Messages app with the summary pre-written. She hits send. |
| **Email** | `contact.email: "you@example.com"` | Same idea with her email app. |
| **Automatic (recommended once it's online)** | Make a free form at [formspree.io](https://formspree.io), paste its URL into `formspreeEndpoint` | Her picks are emailed to you the moment she reaches the last screen. She doesn't have to press anything. |
| **Copy** | Always on | Copies the summary so she can paste it anywhere. |

The message you get looks like:

```
Birthday picks from My Love

Dinner: Sushi Omakase
Activity: Kayaking with manatees
Movie: Rom-Com ("Notting Hill" · Cozy at home)
Excitement: 5/5, Can't sit still
Wishes: Chocolate cake
```

Formspree only works when the site is served from a real web address (not a double-clicked file), so test it after you put the site online.

## Put it online (free)

Any static host works. Easiest options:

- **GitHub Pages:** push this repo to GitHub, then *Settings → Pages → Deploy from branch → main / root*. You'll get a link like `https://yourname.github.io/birthday-site/`.
- **Netlify Drop:** drag this whole folder onto https://app.netlify.com/drop.

Heads-up: on GitHub Pages a public repo means the photos are public to anyone with the link. Use a private repo with a paid plan, or Netlify, if that matters to you.

## Files

```
index.html   page structure (scenes)
styles.css   look and animations
app.js       behavior: transitions, the runaway No button, mascot, sending picks
config.js    ← everything you edit
photos/      ← drop your pictures here
```

The little mochi mascot is drawn in code (`mascotSVG` in `app.js`), so there are no image files to manage for it. Animations respect the "reduce motion" setting on her phone.
