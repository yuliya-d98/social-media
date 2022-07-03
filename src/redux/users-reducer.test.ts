import usersReducer, { actions, InitialStateType } from './users-reducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    usersData: [
      {
        id: 0,
        name: 'Dimych',
        uniqueUrlName: 'dimych0',
        status: 'any status0',
        followed: false,
        photos: { small: null, large: null },
      },
      {
        id: 1,
        name: 'Dimych',
        uniqueUrlName: 'dimych1',
        status: 'any status1',
        followed: false,
        photos: { small: null, large: null },
      },
      {
        id: 2,
        name: 'Dimych',
        uniqueUrlName: 'dimych2',
        status: 'any status2',
        followed: true,
        photos: { small: null, large: null },
      },
      {
        id: 3,
        name: 'Dimych',
        uniqueUrlName: 'dimych3',
        status: 'any status3',
        followed: true,
        photos: { small: null, large: null },
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [], // array of userId's
    filter: {
      term: '',
      friend: null,
    },
  };
});

test('follow success', () => {
  const newState = usersReducer(state, actions.followSuccess(1));

  expect(newState.usersData[0].followed).toBeFalsy();
  expect(newState.usersData[1].followed).toBeTruthy();
});

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3));

  expect(newState.usersData[2].followed).toBeTruthy();
  expect(newState.usersData[3].followed).toBeFalsy();
});
