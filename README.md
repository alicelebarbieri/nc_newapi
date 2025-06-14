# 📰 AliceleBlogAPI - NC News Backend

AliceleAPI is a RESTful API for a news application where users can browse articles, filter by topic, comment on articles and manage user data. Built using Node.js, Express, PostgreSQL and hosted via Render with a Supabase-managed database.

---

## 🌐 Hosted URL

> [[https://aliceleapi.onrender.com/api](https://aliceleapi.onrender.com/api)](https://aliceleblog-api.onrender.com)

Use the `/api` endpoint to see all available routes and their structure.

---

## 📚 Available Endpoints

### `GET /api`
Returns a JSON with all available API endpoints.

### `GET /api/topics`
Returns all topics.
```json
{
  "topics": [
    { "slug": "football", "description": "Footie!" }
  ]
}
```

### `GET /api/articles`
Returns all articles. Supports:
- `sort_by` (any valid column)
- `order` (asc/desc)
- `topic` (filter by topic)

```json
{
  "articles": [
    {
      "author": "butter_bridge",
      "title": "Seafood substitutions are increasing",
      "article_id": 1,
      "topic": "cooking",
      "created_at": "2020-11-07T07:44:00.000Z",
      "votes": 0,
      "article_img_url": "https://example.com/img.png",
      "comment_count": 10
    }
  ]
}
```

### `GET /api/articles/:article_id`
Returns a single article including `comment_count`.

### `GET /api/articles/:article_id/comments`
Returns all comments for the given article.

### `POST /api/articles/:article_id/comments`
Posts a comment to the article.
```json
{
  "username": "butter_bridge",
  "body": "Great article!"
}
```

### `PATCH /api/articles/:article_id`
Updates the vote count of an article.
```json
{
  "inc_votes": 1
}
```

### `DELETE /api/comments/:comment_id`
Deletes a comment by ID. Returns `204 No Content`.

### `GET /api/users`
Returns all registered users.

---


## 🛠 Tech Stack
- Node.js
- Express
- PostgreSQL
- Supabase (hosted database)
- Render (hosted backend)

---

## 🚀 Setup Instructions (Locally)

Clone the repo and install dependencies:
git clone https://github.com/alicelebarbieri/nc_newapi.git
cd nc_newapi
npm install

### Set up your environment:
Create the following environment files:
.env.development
.env.test
.env.production (if needed for deployment)

Add the appropriate PostgreSQL config to each file:
PGDATABASE=nc_news
PGDATABASE=your_database_name
DATABASE_URL=Render URL

### Seed the database:
npm run setup-dbs
npm run seed-dev


### Run tests:
npm test


### Start the server locally:
npm start

---

## 📫 Contact
Feel free to get in touch via GitHub: [@alicelebarbieri](https://github.com/alicelebarbieri)
