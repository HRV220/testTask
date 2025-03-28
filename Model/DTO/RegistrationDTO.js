class RegistrationDTO {
  constructor(login, password, confirmedPassword) {
    this.login = login;
    this.password = password;
    this.confirmedPassword = confirmedPassword;
  }
}
module.exports = RegistrationDTO;
