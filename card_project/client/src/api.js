import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
      }
    }).then(req => {
      return req.data
    })
  },
  getCards () {
    return this.execute('get', '/api/v1/cards')
  },
  getCard (id) {
    return this.execute('get', `/api/v1/cards/${id}`)
  },
  createCard (data) {
    return this.execute('post', '/api/v1/cards', data)
  },
  updateCard (id, data) {
    return this.execute('put', `/api/v1/cards/${id}`, data)
  },
  deleteCard (id) {
    return this.execute('delete', `/api/v1/cards/${id}`)
  }
}
