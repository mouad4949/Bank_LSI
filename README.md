
# 💼 Distributed Systems Project – Bank Account Management

This project is a banking application developed using **Spring Boot** (backend) and **React.js** (frontend) to manage various types of bank accounts and operations.

## 📌 Key Features

- Manage **bank accounts** (current and savings)
- Link accounts to **clients**
- Accounts are created by **employees**
- Manage **operations** (deposit, withdrawal)
- Organize **employees** into **groups** with hierarchy
- Track operations history per account
- Clean and user-friendly interface built with React

---

## ⚙️ Technologies Used

### Backend – Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL / PostgreSQL (configurable)
- Spring Security (optional)
- REST API

### Frontend – React.js
- React + Vite / Create React App
- Axios for HTTP requests
- React Router
- Tailwind CSS / Bootstrap
- Formik + Yup (form validation)

---

## 🗃️ Data Model

### 📘 Account
- `number`: string
- `balance`: double
- `creationDate`: date
- `type`: "CURRENT" or "SAVINGS"
- `overdraft` (if current account): double
- `interestRate` (if savings account): double
- `client`: Client
- `createdBy`: Employee
- `operations`: list of Operation

### 👤 Client
- `code`: string
- `name`: string

### 🧑‍💼 Employee
- `code`: string
- `name`: string
- `supervisor`: Employee
- `groups`: list of Group

### 👥 Group
- `code`: string
- `name`: string
- `employees`: list of Employee

### 🔄 Operation
- `number`: string
- `date`: date
- `amount`: double
- `type`: "DEPOSIT" or "WITHDRAWAL"
- `performedBy`: Employee
- `account`: Account

---

## 🧪 How to Run the Project

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Or using IDE (IntelliJ, Eclipse): run the `main()` method from `Application.java`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Structure

Example Endpoints:

- `GET /api/accounts`
- `POST /api/accounts`
- `GET /api/clients`
- `POST /api/operations/deposit`
- `POST /api/operations/withdrawal`

---

## 📦 Future Improvements

- Authentication & Role-based Access
- Export reports (PDF/CSV)
- Dashboard & Analytics
- Dockerize the app
- Unit and Integration Testing


---

## 📝 License

This project is licensed under the MIT License.
