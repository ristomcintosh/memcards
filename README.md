# Memcards

A flashcard app to help you remember things easily. Study pre-made decks or create your own.

## How to run

1. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

2. Install the dependencies

```bash
npm install
```

3. migration the database

```bash
npx prisma migrate dev
```

4. Run the app

```bash
npm run dev
```

Optional: seed the database with some pre-made decks

```bash
npx prisma db seed
```

## Demo

![Memcards demo](demo/demo.gif)
