// const mongoose = require('mongoose');
// const app = require('../server');

// describe('Server Connection', () => {
//   beforeAll(async () => {
//     // Mocking mongoose connect with a spy
//     jest.spyOn(mongoose, 'connect').mockImplementation(() => Promise.resolve());

//     // Disabling console log during tests
//     jest.spyOn(console, 'log').mockImplementation(() => {});
//   });

//   afterAll(async () => {
//     // Restoring mocked functions to their original state
//     jest.restoreAllMocks();

//     // Closing the server connection or any necessary teardown
//     await mongoose.disconnect();
//   });

//   it('should connect to the MongoDB database', async () => {
//     await app; // Ensuring the server is fully loaded

//     // Expect mongoose.connect to have been called with the correct URI
//     expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
//   });

//   it('should start the server', async () => {
//     const server = await app; // Ensure the server is fully loaded

//     // Expect app.listen to have been called with the correct port
//     expect(server.address().port).toBe(process.env.PORT);
//   });
// });
