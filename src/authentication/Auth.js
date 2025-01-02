import {login, logout, onCurrentUser } from "@/utils/firebase";

export default {
  async login(username, password, onSuccess, onError) {
    try {
      onSuccess(await login(username, password));
    } catch (e) {
      onError(e.code, e.message);
    }
  },
  async logout(onSuccess, onError) {
    try {
      await logout();
      onSuccess();
    } catch (e) {
      onError(e.message);
    }
  },
  currentUser(cb) {
    onCurrentUser(cb);
  }
};
