function userReducer(state, action) {
    switch (action.type) {
      case "logIn":
        return {
          ...state,
          userId: action.value.userId,
          userName: action.value.userName,
          email: action.value.email,
          userToken: action.value.userToken,
        };
      case "logOut":
        return {
          ...state,
          userId: null,
          userName: null,
          email: null,
          userToken: null,
        };
      default:
        return state;
    }
  }
  
  export default userReducer;
  