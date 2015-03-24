var assert = require('assert')
var yq = require('../')

describe('Run generator', function () {
  it('Normal value', function () {
    yq(function *() {
      var n = yield 3
      assert.equal(n, 3)
    })
  })
  
  it('Array', function () {
    yq(function *() {
      var n = yield [1, 2, 3]
      assert.deepEqual(n, [1, 2, 3])
    })
  })
  
  it('Generator', function () {
    yq(function *() {
      var n = yield (function *() {
        var caller = yield
        
        setTimeout(function () {
          caller.success(10)
        }, 1000)
      })()
      
      // console.log(n.)
      assert.equal(n, 10)
    })
  })
})

var fs = require('fs')
var path = require('path')
describe('Yield method', function () {
  it('File system', function () {
    var stat = yq.yield(fs.stat)
    
    yq(function *() {
      var r = yield stat(path.join(__dirname, '../package.json'))
      assert.ok(r.isFile())
    })
  })
})
