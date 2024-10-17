function UserContractor({ name, password, email, role, id, address, phoneNumber }) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.role = role;
  this.id = id;
  this.address = address;
  this.phoneNumber = phoneNumber;

  return JSON.parse(JSON.stringify(this));
}

export default UserContractor;
