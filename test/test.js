const chai = require('chai')
const expect = chai.expect
const request = require('supertest');
const calculator = require('../src/calculator')
const app = require('./api')

// Calculator  arithmetic tests
describe('Calculator', () => {
	describe('Addition', () => {
		it('should sum two numbers', () => {
			expect(calculator.add(2, 2)).to.equal(4)
			expect(calculator.add(50, 39)).to.equal(89)
		})
	})

	describe('Subtraction', () => {
		it('should subtract two numbers', () => {
			expect(calculator.subtract(6, 2)).to.equal(4)
			expect(calculator.subtract(50, 39)).to.equal(11)
		})
	})

	describe('Multiplication', () => {
		it('should multiply two numbers', () => {
			expect(calculator.multiply(3, 2)).to.equal(6)
			expect(calculator.multiply(-31, 32)).to.equal(-992)
			expect(calculator.multiply(0, -2)).to.equal(0)
		})
	})

	describe('Division', () => {
		it('should divide two numbers', () => {
			expect(calculator.divide(4, 2)).to.equal(2)
			expect(calculator.divide(50, 5)).to.equal(10)
		})
		it('should return NaN if the denominator is zero', () => {
			expect(calculator.divide(4, 0)).to.equal(undefined)
			expect(calculator.divide(-15, 0)).to.equal(undefined)
		})
		it('should return 0 if the numerator is zero', () => {
			expect(calculator.divide(0, 6)).to.equal(0)
		})
	})
})



// API tests
describe('POST /add-task', function() {
	it('Adds a task', function(done) {
	  request(app)
		.post('/add-task')
		.send({ title: "API testing rocks!" })
		.expect(201, done);
	});
  });

  describe('GET /tasks', function() {
	it('List all tasks', function(done) {
	  request(app)
		.get('/tasks')
		.expect(200, done);
	});
  });

  describe('GET /tasks/:id', function() {
	it('Gets a particular task', function(done) {
	  request(app)
		.get('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
		.expect(200, done);
	});
  });


  describe('PUT /tasks/:id', function() {
	it('Updates a particular task', function(done) {
	  request(app)
		.put('/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2')
		.send({ title : "Updated task buoy" })
		.expect(200, done);
	});
  });  


  describe('DELETE /tasks/:id', function() {
	it('Deletes a particular task', function(done) {
	  request(app)
		.delete('/tasks/8e88212c-2a05-4774-a371-9638cc897e52')
		.expect(200, done);
	});
  });    