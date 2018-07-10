const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const BookService = require('./services/books.js')

const app = express(feathers());
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.configure(express.rest())

app.use('books', new BookService())

async function addBooks() {
  const service = app.service('books');
  await service.create({
    title: 'The Bible'
  })
  await service.create({
    title: 'Bhagavad Gita'
  })
  await service.create({
    title: 'Torah'
  })
  return;
}
async function findBooks() {
  const service = app.service('books')
  const results = await service.find()
  console.dir(results)
}

app.service('books').on('created', book => {
    console.log('New Book!', book)
  })

  !(async () => {
    await addBooks();
    await findBooks();
  })()

app.use(express.errorHandler())
app.listen(3030)
