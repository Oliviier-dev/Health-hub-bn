# 🏥 Health Hub

Health Hub is an easy-to-use platform that helps patients and doctors connect for virtual consultations. It makes it simple for patients to find doctors, set up appointments, and for doctors to manage their practice and schedule.

## ✨ Features

-   🔒 User authentication (Sign up, Log in, Log out, Reset Password)
-   🧑‍⚕️ Patient and doctor profile management
-   📅 Appointment booking and approval
-   💳 Payment processing before appointments
-   💬 Messaging system post-payment

## 🛠️ Technology Stack

-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL with Sequelize ORM
-   **Authentication**: JSON Web Tokens (JWT)
-   **Encryption**: `crypto-js`
-   **API Documentation**: Swagger (OpenAPI)

## 🗂️ Project Structure

```plaintext
HealthHub/
├── config/           # Database configurations
├── controllers/      # API controllers
├── docs/             # Swagger documentation
├── migrations/       # Database schema migrations
├── models/           # Database models
├── routes/           # API routes
├── Seeders/          # Database seed data
├── services/         # Business logic
└── utils/            # Utility functions and helpers

```

## 🚀 Getting Started

### Clone the Repository

```bash

git clone https://github.com/oliviier-dev/health-hub.git
```

## Install dependencies:

```bash

cd health-hub
npm install
```

## Set up environment variables:

1. Create a `.env` file in the root directory.
2. Add necessary environment variables.

## Run the development server:

```bash

npm run server
```

## 📄 API Documentation

Swagger documentation is available at [http://localhost:8080/docs](http://localhost:8080/docs).

## 🤝 Contributing

Contributions are welcome! Please create a pull request or open an issue for any feature requests or bug reports.
