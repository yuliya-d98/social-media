import profileReducer, { actions } from './profile-reducer';

// 1. test data
const action = actions.addPostActionCreator('it-kamasutra.com');
const state = {
  postsData: [
    { id: 0, message: "It's our new program! Hey!" },
    { id: 1, message: 'Hello its me' },
    { id: 2, message: 'Wow there are a lot of posts' },
  ],
  profile: null,
  status: '',
};

test('length of posts should be incremented', () => {
  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(4);
});

test('message of new post should be correct', () => {
  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData[0].message).toBe('it-kamasutra.com');
});

test('after deleting length of posts should be decremented', () => {
  const action = actions.deletePost(1);
  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(2);
});

test("if writing incorrect post id length of posts doesn't change", () => {
  const action = actions.deletePost(999999);
  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(3);
});
