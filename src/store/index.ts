import { observable, action, computed } from 'mobx';

export class Store {

  @observable
  public userInfo = {
    username: '',
    password: '',
    token: '',
    logged: true
  };

  @computed get userAllname() {
    return this.userInfo.username + this.userInfo.password;
  }

  @action
  public setToken(token: string) {
    this.userInfo.token = token;
    this.userInfo.logged = true;
  }

  @action
  public removeToekn() {
    this.userInfo.token = '';
    this.userInfo.logged = false;
  }
}

export default new Store();
