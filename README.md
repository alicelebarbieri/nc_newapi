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

## 🚀 Getting Started Locally

```bash
git clone https://github.com/AliceleBarbieri/be-nc-news.git
cd be-nc-news
npm install
```

Set up your local `.env.development` and `.env.test` files in the root folder:
```
PGDATABASE=nc_news
PGDATABASE_TEST=nc_news_test
```

Then create and seed the databases:
```bash
npm run setup-dbs
npm run seed
```

Run the tests:
```bash
npm test
```

Run the server locally:
```bash
npm start
```

---

## 🌍 Production Setup

- Hosted via [Render](https://render.com)
- Production database managed by [Supabase](https://supabase.com)

Environment variables used:
```
NODE_ENV=production
DATABASE_URL=<your_supabase_postgres_connection_url>
```

To seed production database:
```bash
npm run seed-prod
```

---

## 📦 Tech Requirements

- Node.js: v18.x or higher
- PostgreSQL: v12 or higher

---

## 👩‍💻 Author
**Alicele Barbieri**

## 📫 Contact
Feel free to get in touch via GitHub: [@alicelebarbieri](https://github.com/alicelebarbieri)
