const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const userModel = require('../app/models/user');
const noteModel = require('../app/models/note');

const testData = {
  testUser: {
    username: 'testUser',
    password: 'testPassword',
  },
  note1: {
    title: 'title test 1',
    text: 'text test 1',
  },
  note2: {
    title: 'title test 2',
    text: 'text test 2',
  },
};

before(async () => {
  const password = await bcrypt.hash(testData.testUser.password, 10);
  const BcryptUser = Object.assign({}, testData.testUser, { password });
  const user = await userModel.create(BcryptUser);
  testData.note1.author = ObjectId(user._id);
  testData.note2.author = ObjectId(user._id);
  await noteModel.create(testData.note1);
  await noteModel.create(testData.note2);
});

after(async () => {
  const users = await userModel.find({ username: testData.testUser.username });
  users.map(async (user) => {
    await noteModel.deleteMany({ author: ObjectId(user._id) });
  });
  await userModel.deleteMany({ username: testData.testUser.username });
});

module.exports = testData;
