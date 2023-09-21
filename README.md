# User Registration with OTP Verification 
### This Node js application Provides a user verification system with opt(One-Time-Password) in user registration. 
## Future

- **Database Management**: The heart of the app is the MongoDB database, which stores and retrieves  user data, and authentication details.

- **Backend Power**: The backend is powered by Node.js and Express, which manage the API requests and the underlying data. This separation of concerns ensures efficient handling of various functionalities.

- **Secure Authentication**: User accounts are managed securely. Users can register with OTP verification.

- **IP address verification**: IP address is verified by the IPiinfo Module to verify user device and authentication.

## Prerequisites

Before running this application, make sure you have the following:

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [Twilio](https://www.twilio.com/) account with Account SID, Auth Token, and a Twilio phone number
- `.env` file with the following environment variables:

   ```plaintext
      connect ="Replace with your MongoDB Atlas Connect URL Or Local Database URL"
      port="Replace With Port Number"
      ipinfotoken="Replace With ipinfotoken"
      authToken="Replace With authtokent of twilio"
      accountSid="Replace With accountSid of twilio"
    ```

## Installation

1. Clone this repository:

   ```bash
   git clone [https://github.com/rizwank123/Cuvette-Assignment.git](https://github.com/HARSHAL-AP/returnj.git)
   cd returnj
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of your project and add the environment variables mentioned in the Prerequisites section.

## Usage

Start the server:

```bash
node server.js
```

The server will be running on port 3000 by default. You can access the API endpoints as follows:

- User Registration: `POST /user/register`
- OTP Verification: `POST /user/login`

