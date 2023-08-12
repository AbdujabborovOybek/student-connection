const user = JSON.parse(localStorage.getItem("user")) || null;

export const reAuth = (state = user, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export const acAuth = (user) => ({ type: "AUTH", payload: user });
