module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          user_id: "kira@hot",
          username: "YoRHa54i",
          password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InVzZXIiLCJuYW1lIjpudWxsLCJwcm9maWxlUGljIjpudWxsLCJpYXQiOjE1Nzg0NzM4MjAsImV4cCI6MTU3ODQ3NzQyMH0.733aaJ6hw2NaLmdKJe3Iy1lD07hhWP-CENPh-Ds1r24",
          role: "admin"
        }
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', [{}]);
  }
}