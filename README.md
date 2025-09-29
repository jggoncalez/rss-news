# RSS News Viewer

A simple RSS feed aggregator built with JavaScript.  
It fetches RSS feeds via the [rss2json API](https://rss2json.com/) and displays news items dynamically on a web page.

> Display news quickly and easily without a backend.

---

## 🛠 Features

- Fetch and display news from any RSS feed URL.
- Shows title, image (if available), and description.
- Handles images via multiple sources: `enclosure`, `description`, or `content`.
- Pure frontend: HTML, CSS, and JavaScript.
- Works on modern browsers with `fetch` / XMLHttpRequest support.
- Easy to customize layout and styles.

---

## 📁 Project Structure

```
rss-news/
│
├── index.html          # Main page
├── custom.html         # Example / customization page
├── digitaltrends.html  # Example RSS feed page
├── style.css           # Styles
└── script.js           # JavaScript logic for fetching and rendering RSS
```

---

## 🚀 How to Use

1. Clone the repository:

```bash
git clone https://github.com/jggoncalez/rss-news.git
cd rss-news
```

2. Open `index.html` in a browser **or** run a local server (recommended for CORS):

```bash
npx http-server .       # or use live-server
```

3. Enter any RSS feed URL in the input field and click "Update".  
4. News items will be displayed dynamically below.

---

## ⚙️ How It Works

- `rsslink` holds the user-provided RSS URL.
- `changeRSSLink()` updates the RSS feed URL and clears previous content.
- `updateRSS()` fetches data from the `rss2json` API using XMLHttpRequest, parses JSON, and generates HTML dynamically:

```javascript
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        // Loop through items and create HTML
    }
};
xhr.open('GET', `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rsslink)}`, true);
xhr.send();
```

- Handles multiple ways to extract images from RSS items.
- Dynamically creates HTML elements: titles, images, descriptions, and links.

---

## 🧩 Technologies

- HTML5 / CSS3
- JavaScript (ES6)
- XMLHttpRequest (or fetch API alternative)
- rss2json API (no backend required)

---

## 📞 Author / Contact

- **Author**: jggoncalez
- GitHub: [https://github.com/jggoncalez/rss-news](https://github.com/jggoncalez/rss-news)
