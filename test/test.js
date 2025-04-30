// Install required packages:
// npm install --save-dev mocha chai supertest

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Task = require("../models/Task");

const should = chai.should();
chai.use(chaiHttp);

describe("Tasks API", () => {
  // Before each test, clear the database
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe("GET /api/tasks", () => {
    it("it should GET all the tasks", (done) => {
      chai.request(server)
        .get("/api/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("POST /api/tasks", () => {
    it("it should POST a new task", (done) => {
      const task = {
        user: "Test User",
        status: "In Progress",
        dueDate: "2024-12-12",
        priority: "High",
        comment: "Unit test comment"
      };

      chai.request(server)
        .post("/api/tasks")
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("user").eql("Test User");
          done();
        });
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("it should DELETE a task given the id", async () => {
      const task = await Task.create({
        user: "Delete Test",
        status: "Completed",
        dueDate: "2024-10-10",
        priority: "Low",
        comment: "To be deleted"
      });

      chai.request(server)
        .delete(`/api/tasks/${task._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Task deleted successfully");
        });
    });
  });
});
