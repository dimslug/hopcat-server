class Admin {
  constructor(adminID, ID, firstName, lastName, username, email) {
    this.adminID = adminID;
    this.ID = ID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
  }
}

// Example usage:
const sampleAdmin = new Admin(
  "A123",
  "ID456",
  "John",
  "Doe",
  "johndoe",
  "johndoe@example.com"
);

console.log(sampleAdmin);
