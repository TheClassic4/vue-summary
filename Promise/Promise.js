const STATUS = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
}

class Promise {
  constructor(task) {
  	this.status = STATUS.PENDING
  	this.resolveData = null
  	this.rejectData = null
  	this.onFulfilledList = []
  	this.onRejectedList = []
      
	  this.onResolve = (data) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.resolveData = data
        this.onFulfilledList.forEach(fn => {
          fn(this.resolveData)
        })
      }
    }

    this.onReject = (err) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.rejectData = err
        this.onRejectedList.forEach(fn => {
          fn(this.rejectData)
        })
      }
    }

    this.resolvePromise = (data, resolve, reject) => {
      if (data instanceof Promise) {
        if (data.status === STATUS.PENDING) {
          data.then((val) => {
            this.resolvePromise(val, resolve, reject);
          }, reject)
        } else if (data.status === STATUS.FULFILLED) {
          resolve(data.resolveData)
        } else {
          reject(data.rejectData)
        }
      }
      else if (data !== null && data instanceof Object) {
        try {
          let then = data.then
          if (then instanceof Function) {
            then.call(data, (val) => {
              this.resolvePromise(val, resolve, reject)
            }, reject)
          } else {
            resolve(data)
          }
        } catch (err) {
          reject(err)
        }
      } else {
        resolve(data)
      }
    }
    try {
      task(this.onResolve.bind(this), this.onReject.bind(this))
    } catch (err) {
      this.onReject(err)
    }
	}

  then(onFulfilled, onRejected) {
    let promise
    if (this.status === STATUS.PENDING) {
      prmise = new Promise((resolve, reject) => {
        this.onFulfilledList.push(() => {
          if (!onFulfilled instanceof Function) {
            resolve(this.resolveData)
          } else {
            let data = onFulfilled(this.resolveData)
            this.resolvePromise(data, resolve, reject)
          }
        }) 
        this.onRejectedList.push(() => {
          if (!(onRejected instanceof Function)) {
            reject(this.rejectData)
          } else {
            let data = onRejected(this.rejectData)
            this.resolvePromise(data, resolve, reject)
          }
        })
      })
    } else if (this.status === STATUS.FULFILLED) {
      promise = new Promise((resolve, reject) => {
        if (!(onFulfilled instanceof Function)) {
          resolve(this.resolveData)
        } else {
          let data = onFulfilled(this.resolveData)
          this.resolvePromise(data, resolve, reject)
        }
      })
    }  else {
      promise = new Promise((resolve, reject) => {
        if (!(onRejected instanceof Function)) {
          reject(this.rejectData)
        } else {
          let data = onRejected(this.rejectData)
          this.resolvePromise(data, resolve, reject)
        }
      })
    }
  }
  return promise
}

static resolve(value) {
  if (value instanceof Promise) {
    return value
  }
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

static reject(value) {
  if (value instanceof Promise) {
    return value
  }
  return new Promise((resolve, reject) => {
    reject(value)
  })
}