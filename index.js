import EventEmitter from 'events'

class Collection extends EventEmitter {
  documents = {}
  latestId = -1

  hydrate(documents, latestId) {
    this.documents = documents
    this.latestId = latestId
  }

  createDocument(data, source = 'local') {
    this.latestId++
    data._id = this.latestId
    this.documents[this.latestId] = data

    this.emit('create', source, data)
    this.emit('change', source, data)

    return true
  }

  updateDocument(id, data, source = 'local') {
    if (this.hasDocument(id)) {
      this.documents[id] = data

      this.emit('update', source, data)
      this.emit('change', source, data)

      return true
    }

    return false
  }

  deleteDocument(id, source = 'local') {
    if (this.hasDocument(id)) {
      const data = this.documents[id]
      delete this.documents[id]
      this.emit('delete', source, data)
      this.emit('change', source, data)

      return true
    }

    return false
  }

  hasDocument(id) {
    return this.documents[id] !== undefined
  }

  getDocument(id) {
    return this.documents[id] ?? null
  }

  getIds() {
    return Object.keys(this.documents)
  }

  getDocuments() {
    return Object.values(this.documents)
  }
}

export default Collection
