const userModel = require('../app/models/user');

const testUser = {
  username: 'testUser',
  password: 'testPassword',
};

// before((done) => {
//   userModel.create(testUser).then(() => {
//     done();
//   });
// });

after((done) => {
  userModel.deleteMany({ username: testUser.username }).then(() => {
    done();
  });
});
