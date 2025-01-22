### `README.md`

```markdown
# URL Shortener Backend

This project is a backend application for a URL shortener service, built using **Node.js**, **Express**, and **MongoDB**. It includes core features like shortening URLs, redirecting to original URLs, tracking clicks, and advanced features such as user authentication, custom aliases, and expiration dates.

---

## Features

### Core Features:
- Shorten long URLs.
- Redirect users to the original URL using the shortened link.
- Track the number of clicks for each shortened URL.

### Advanced Features:
- User authentication for managing URLs.
- Custom aliases for shortened URLs.
- Set expiration dates for shortened URLs.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener-backend.git
   cd url-shortener-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/urlShortener
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### **Authentication APIs**
| Endpoint           | Method | Description                     |
|--------------------|--------|---------------------------------|
| `/api/auth/register` | `POST` | Register a new user.            |
| `/api/auth/login`    | `POST` | Login to get a JWT token.       |

#### Request Body (for `/register` and `/login`):
```json
{
  "username": "testuser", // For register
  "email": "test@example.com",
  "password": "yourpassword"
}
```

---

### **URL Management APIs**
| Endpoint                 | Method | Description                              |
|--------------------------|--------|------------------------------------------|
| `/api/url/shorten`        | `POST` | Shorten a new URL (requires auth).       |
| `/api/url/:shortId`       | `GET`  | Redirect to the original URL.            |
| `/api/url/links`          | `GET`  | Get all URLs created by the user (auth). |

#### Request Body (for `/shorten`):
```json
{
  "originalUrl": "https://example.com",
  "alias": "customAlias", // Optional
  "expiresAt": "2025-01-01T00:00:00Z" // Optional
}
```

---

## Database Models

### **User**
| Field     | Type     | Description                 |
|-----------|----------|-----------------------------|
| `username`| String   | Unique username of the user.|
| `email`   | String   | Unique email of the user.   |
| `password`| String   | Encrypted user password.    |

### **URL**
| Field        | Type     | Description                                     |
|--------------|----------|-------------------------------------------------|
| `originalUrl`| String   | The original long URL.                          |
| `shortId`    | String   | The generated unique short identifier.          |
| `alias`      | String   | Optional custom alias for the shortened URL.    |
| `clicks`     | Number   | Count of how many times the shortened URL is used.|
| `expiresAt`  | Date     | Expiration date of the shortened URL (optional).|
| `userId`     | ObjectId | Reference to the user who created the URL.      |

---

## Usage

1. **Register and Login**:
   - Register a user using `/api/auth/register`.
   - Login to obtain a JWT token from `/api/auth/login`.

2. **Shorten a URL**:
   - Send a `POST` request to `/api/url/shorten` with the `Authorization` header containing the JWT token.

3. **Access a Shortened URL**:
   - Access `http://localhost:5000/api/url/:shortId` to be redirected to the original URL.

4. **Manage Your URLs**:
   - Get a list of all URLs created by the authenticated user via `/api/url/links`.

---

## Project Structure
```plaintext
url-shortener/
├── config/
│   └── config.js          # Application configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── urlController.js   # URL management logic
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── Url.js             # URL model
│   └── User.js            # User model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── urlRoutes.js       # URL management routes
├── utils/
│   └── db.js              # Database connection logic
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
```

---

## Future Improvements
- Add analytics dashboards for tracking user activity.
- Implement rate limiting for added security.
- Include email notifications for URL expiration.

---

## License
This project is licensed under the MIT License.

---

### Happy URL Shortening! 🚀
```