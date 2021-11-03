import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    request.get(url, { params }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    request.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}
