const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

const initialState = {
  usersData: [
    // {
    //   id: 1,
    //   username: "Sveta K.",
    //   location: {
    //     city: "Minsk",
    //     country: "Belarus",
    //   },
    //   status: "I am so pretty",
    //   isFollowing: false,
    // },
    // {
    //   id: 2,
    //   username: "Sveta K.",
    //   location: {
    //     city: "Minsk",
    //     country: "Belarus",
    //   },
    //   status: "I am so pretty",
    //   isFollowing: true,
    // },
    // {
    //   id: 3,
    //   username: "Sveta K.",
    //   location: {
    //     city: "Minsk",
    //     country: "Belarus",
    //   },
    //   status: "I am so pretty",
    //   isFollowing: false,
    // },
    // {
    //   id: 4,
    //   username: "Sveta K.",
    //   location: {
    //     city: "Minsk",
    //     country: "Belarus",
    //   },
    //   status: "I am so pretty",
    //   isFollowing: false,
    // },
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return { ...user, isFollowing: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return { ...user, isFollowing: false };
          }
          return user;
        }),
      };
    case SET_USERS:
      return { ...state, usersData: [...state.usersData, ...action.users] };
    default:
      return state;
  }
};

export default usersReducer;

export const followAC = (userId) => ({
  type: FOLLOW,
  userId: userId,
});

export const unfollowAC = (userId) => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

export const setUsersAC = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};
