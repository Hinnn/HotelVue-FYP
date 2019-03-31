import Api from '@/services/api'

export default {

  findAll (room) {
    return Api().get('/rooms', room,
      {headers: {'Content-type': 'application/json'}})
  }
}
