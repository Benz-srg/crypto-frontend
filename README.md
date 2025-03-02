# **📌 Project: Crypto Dashboard Frontend**

This is a **real-time cryptocurrency dashboard** built with **Next.js 15**, **Tailwind CSS 4**, and **WebSockets** for real-time price updates. The application allows users to view, add, update, and delete cryptocurrency data while receiving live market price updates from Binance.

---

## **🚀 Features**

✅ **Next.js 15** – Modern React-based framework for fast and scalable frontend development\
✅ **Tailwind CSS 4** – Utility-first CSS framework for a sleek and responsive UI\
✅ **WebSocket Integration** – Real-time price updates via **NestJS WebSocket**\
✅ **Jotai for State Management** – Efficient and minimal global state management\
✅ **CRUD Operations** – Add, Edit, Delete cryptocurrencies dynamically\
✅ **Server-Side Price Updates** – Automatic price updates using **Binance API**\
✅ **Docker Support** – Easily deployable with Docker and Docker Compose

---

## **📂 Tech Stack**

- **Frontend:** Next.js 15, React, Tailwind CSS 4, TypeScript, Jotai
- **Backend:** NestJS, Sequelize (PostgreSQL), WebSockets, Binance API
- **Database:** PostgreSQL
- **Deployment:** Docker, Docker Compose

---

## **📦 Installation & Setup**

Follow these steps to run the **frontend** and **backend** together.

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/Benz-srg/crypto-frontend.git
cd crypto-frontend
```

---

### **2️⃣ Backend Setup (NestJS)**

> The backend provides WebSocket connections and real-time crypto price updates.

#### **Run Backend with Docker**

1. Navigate to the backend folder:
   ```sh
   cd crypto-testing
   ```
2. Build and start the backend service:
   ```sh
   docker compose up --build
   ```

#### **Environment Variables (**``**) for Backend**

Create a `.env` file in the backend directory:

```env
DB_HOST=crypto_db
DB_PORT=5432
DB_USER=crypto_testing
DB_PASSWORD=crypto_testing_password
DB_NAME=crypto_testing
```

---

### **3️⃣ Frontend Setup (Next.js)**

> The frontend interacts with the backend WebSocket service to display live crypto prices.

#### **Run Frontend with Docker**

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Build and start the frontend service:
   ```sh
   docker build -t crypto-frontend .
   docker run -p 8080:8080 --name crypto-frontend crypto-frontend
   ```

#### **Environment Variables (**``**) for Frontend**

Create a `.env.example` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3000
```

---

### **4️⃣ Run Both Frontend & Backend with Docker Compose**

You can simplify the process by running both **frontend** and **backend** together using **Docker Compose**.

1. Navigate to the project root:
   ```sh
   cd crypto-frontend
   ```
2. Run the services:
   ```sh
   docker-compose up --build
   ```

> **Your frontend will be available at:** `http://localhost:8080`\
> **Your backend will run at:** `http://localhost:3000`

---

## **🖥️ How to Use**

1. **View Real-Time Prices:** The dashboard will display a list of cryptocurrencies with live price updates.
2. **Add Cryptocurrency:** Click the **"+ Add Crypto"** button and enter the details.
3. **Edit Cryptocurrency:** Click the **"✏️ Edit"** button next to any coin to modify its details.
4. **Delete Cryptocurrency:** Click the **"🗑️ Delete"** button to remove a cryptocurrency.
5. **WebSocket Updates:** Prices update in real-time without page reloads.

---

## **📡 WebSocket Events**

| Event Name   | Payload Type | Description                           |
| ------------ | ------------ | ------------------------------------- |
| `cryptoList` | `Crypto[]`   | Initial list of cryptocurrencies      |
| `coinUpdate` | `Crypto`     | Live update when a coin price changes |

---

## **📜 API Endpoints**

| Method     | Endpoint                | Description              |
| ---------- | ----------------------- | ------------------------ |
| **GET**    | `/cryptocurrencies`     | Get all cryptocurrencies |
| **POST**   | `/cryptocurrencies`     | Add a new cryptocurrency |
| **PUT**    | `/cryptocurrencies/:id` | Update cryptocurrency    |
| **DELETE** | `/cryptocurrencies/:id` | Delete cryptocurrency    |

---

## **🔧 Troubleshooting**

### **WebSocket Not Connecting?**

- Ensure the **backend** is running before the **frontend**.
- Check `.env.example` for the correct WebSocket URL:
  ```
  NEXT_PUBLIC_SOCKET_URL=ws://localhost:3000
  ```

### **Database Not Updating?**

- Check the logs:
  ```sh
  docker compose logs crypto-testing
  ```
- Run migrations manually:
  ```sh
  docker compose exec -it crypto-testing yarn migrate
  ```

---

## **📜 License**

This project is **MIT Licensed**. Feel free to use and modify it.

---

## **📬 Contact**

If you have any issues or feature requests, feel free to **open an issue** or reach out:

🔗 **GitHub:** [Benz-srg](https://github.com/Benz-srg)\
📧 **Email:** [ekkasit.srg@gmail.com](mailto:ekkasit.srg@gmail.com)
