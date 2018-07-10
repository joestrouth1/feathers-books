const {
  BadRequest
} = require('@feathersjs/errors')

module.exports = class Books {
  constructor() {
    this.books = [{
      id: 0,
      title: 'The Master and Margarita'
    }]
    this.currentId = 1
  }

  async find(params) {
    return this.books
  }

  async get(id, params) {
    const book = this.books.find(book => book.id === parseInt(id, 10))

    if (!book) {
      throw new BadRequest('No book found or invalid book ID')
    } else {
      return book;
    }

  }

  async create(data, params) {
    const book = Object.assign({
      id: this.currentId++
    }, data)
    this.books.push(book)
    return book
  }

  async patch(id, data, params) {
    const book = await this.get(id)
    return Object.assign(book, data)
  }

  async remove(id, params) {
    const book = await this.get(id)
    const index = this.books.indexOf(book)
    this.books.splice(index, 1)
    return book
  }
}
