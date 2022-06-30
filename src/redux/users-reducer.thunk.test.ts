import { followAPI } from '../api/followAPI';
import { CommonResponceType, ResultCodesEnum } from '../types/api';
import { actions, followThunkCreator, unfollowThunkCreator } from './users-reducer';

jest.mock('../api/followAPI');
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  followAPIMock.followUser.mockClear();
  followAPIMock.unfollowUser.mockClear();
});

const result: CommonResponceType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

test('success follow thunk', async () => {
  followAPIMock.followUser.mockReturnValue(Promise.resolve(result));
  const thunk = followThunkCreator(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('success unfollow thunk', async () => {
  followAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
  const thunk = unfollowThunkCreator(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
