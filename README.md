# 🏏 Cricket Pitch Booking System

A real-time cricket pitch booking platform that allows users to check pitch availability, reserve slots, and confirm bookings while preventing double-booking through database-level concurrency control.

---

# 📸 Application Screenshots
# Home Page
<img width="1882" height="913" alt="image" src="https://github.com/user-attachments/assets/1180453e-44b4-4e84-a379-41cee3e16ff9" />
# Register Page
<img width="1915" height="917" alt="image" src="https://github.com/user-attachments/assets/0ef8aa24-c6cd-4033-8099-0c61d7eadfaa" />
# Login Page
<img width="1911" height="932" alt="image" src="https://github.com/user-attachments/assets/c3d5cec3-66af-4d1e-b9bb-48e3b319b99b" />
# Dashboard Page
<img width="1897" height="905" alt="image" src="https://github.com/user-attachments/assets/af953cd1-669b-4f97-bdb4-5da994a7a6b2" />
# Pitches Page
<img width="1908" height="925" alt="image" src="https://github.com/user-attachments/assets/b17c427e-29ba-4744-bac9-ba615078113a" />
# My Booking Page
<img width="1892" height="913" alt="image" src="https://github.com/user-attachments/assets/79bcaea1-8de3-4825-96c4-2f1ceddbee44" />


## 🚀 Features

### Authentication
- User Registration
- User Login
- User Logout
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes & APIs

### Pitch Management
- View Available Cricket Pitches
- Pitch Location Details
- Hourly Pricing

### Slot Booking
- Select Pitch
- Select Date
- View Available Slots
- Reserve Slot for 2 Minutes
- Confirm Booking

### Real-Time Updates
- Socket.io Integration
- Instant Slot Status Updates
- Live Booking Synchronization

### Booking Management
- View My Bookings
- Booking Status Tracking
- Booking History

---

# 🛠 Tech Stack

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- Socket.io Client

## Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Socket.io
- JWT
- bcrypt

## Database
- PostgreSQL

---
## 📂 Project Structure

```text
cricket-pitch-booking-system
│
├── frontend/
│   ├── app/
│   │   ├── book-pitch/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── my-bookings/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── types/
│   │   └── lib/
│   │
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── prisma/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone https://github.com/AmarDeepCodesAI/cricket-pitch-booking-system.git

cd cricket-pitch-booking-system
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```
```

---

# 🗄 Database Setup

Create PostgreSQL Database:

```sql
CREATE DATABASE cricket_booking;
```

Create `.env` inside backend folder:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cricket_booking
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

---

# 📊 Database Schema

## Users

```sql
users
------
id
name
email
password
created_at
```

## Pitches

```sql
pitches
--------
id
name
location
price_per_hour
created_at
```

## Slots

```sql
slots
------
id
pitch_id
start_time
end_time
status
created_at
```

## Reservations

```sql
reservations
-------------
id
user_id
slot_id
expires_at
created_at
```

## Bookings

```sql
bookings
---------
id
user_id
pitch_id
slot_id
booking_date
status
created_at
```

---

# 🔌 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Pitches

```http
GET /api/pitches
GET /api/pitches/:pitchId/slots
```

## Booking

```http
POST /api/bookings/reserve
POST /api/bookings/confirm
GET  /api/bookings/my-bookings
```

---

# 🔒 Concurrency Handling

### Problem

Two users may attempt to book the same slot simultaneously.

Example:

```text
User A → Books 7:00 PM – 8:00 PM
User B → Books 7:00 PM – 8:00 PM
```

### Solution

Implemented:

- PostgreSQL Transactions
- Row Locking (`SELECT ... FOR UPDATE`)
- Unique Constraints

This guarantees that only one booking can be confirmed for a slot.

---

# ⏳ Temporary Reservation Logic

When a user selects a slot:

```text
AVAILABLE → RESERVED
```

The slot remains reserved for:

```text
2 Minutes
```

If booking is not confirmed:

```text
RESERVED → AVAILABLE
```

Implemented using:

- Reservation Table
- Scheduled Cleanup Service
- Automatic Expiry Logic

---

# ⚡ Real-Time Updates

Implemented using Socket.io.

Events:

```text
slotReserved
slotBooked
slotReleased
```

Users viewing the same pitch instantly see slot status updates.

---

# 📈 Scalability Considerations

For 10,000+ concurrent users:

### Database
- Connection Pooling
- Query Optimization
- Read Replicas

### Socket Scaling
- Redis Pub/Sub
- Sticky Sessions
- Load Balancer

### Application
- Horizontal Scaling
- Docker Containers
- Kubernetes

---

# 🎯 Edge Cases Handled

- Duplicate Booking Requests
- Race Conditions
- Reservation Expiry
- Multiple Tab Booking
- User Refresh During Reservation
- Unauthorized API Access
- Expired JWT Tokens

---

# ✅ Deliverables Completed

- GitHub Repository
- User Authentication
- PostgreSQL Database
- JWT Security
- Real-Time Slot Updates
- Reservation Expiry Logic
- Booking Management
- Concurrency Control
- Architecture Explanation

---

# 👨‍💻 Author

**Amar Deep**

GitHub: https://github.com/AmarDeepCodesAI
