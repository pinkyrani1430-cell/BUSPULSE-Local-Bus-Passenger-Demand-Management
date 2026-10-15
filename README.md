# BusPulse — Local Bus Passenger-Demand Management System

A beginner-friendly, clean full-stack web application designed to help transit operators monitor expected passenger demand at every stop along a bus route before and during a journey.

---

## 📌 Problem & Concept

On busy corridors, some buses arrive overcrowded while other buses on the same route operate with low occupancy. **BusPulse** solves this by gathering commuter journey intentions (Boarding stop, Destination stop, Passenger count) in advance.

The system calculates expected occupancy at each stop using boarding and alighting transitions:
- When passengers board at a stop, the onboard count increases.
- When passengers get down at a stop, the onboard count decreases after that stop.
- The operator dashboard provides non-intrusive **decision support** (LOW, NORMAL, HIGH, FULL) without automated dispatch, allowing supervisors to evaluate relief buses or adjust dispatch headways.

### Example Flow (Route 500)
- **Silk Board** → 20 passengers (LOW)
- **BTM Layout** → 35 passengers (NORMAL)
- **Jayadeva** → 50 passengers (HIGH — Peak load)
- **Dairy Circle** → 40 passengers (NORMAL)
- **Richmond Circle** → 15 passengers (LOW)

---

## 🚀 Technology Stack

- **Frontend:** React.js, Tailwind CSS, Lucide icons, Inter typography
- **Backend:** Node.js, Express.js RESTful APIs
- **Database:** MongoDB & Mongoose schemas with seamless embedded persistent storage fallback
- **i18n:** English, हिन्दी (Hindi), ಕನ್ನಡ (Kannada)

---

## 🛠️ Project Structure

```text
├── server.ts                   # Express server entry point with Vite middleware
├── src/
│   ├── server/
│   │   ├── models.ts           # Mongoose schemas (Bus, Journey, User)
│   │   ├── db.ts               # MongoDB connector & embedded persistence layer
│   │   ├── api.ts              # RESTful API routes (/api/buses, /api/journeys, /api/demand)
│   │   └── demandCalculator.ts # Stop-by-stop cumulative demand algorithm
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation, language selector, role toggle
│   │   ├── PassengerView.tsx    # Passenger booking interface & journey passes
│   │   ├── OperatorDashboard.tsx# Real-time stop occupancy monitor & guidance
│   │   └── AboutModal.tsx       # System documentation modal
│   ├── types.ts                # TypeScript interfaces
│   ├── i18n.ts                 # Trilingual translations (EN, HI, KN)
│   ├── api.ts                  # Client fetch wrapper
│   ├── App.tsx                 # Main application coordinator
│   ├── main.tsx                # React entry
│   └── index.css               # Tailwind CSS & Inter font styling
├── package.json
└── README.md
```

---

## 📡 RESTful API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/buses` | List all buses, capacities, and ordered stops |
| `GET` | `/api/buses/:id` | Get single bus details |
| `GET` | `/api/demand/:busId` | Get calculated stop-by-stop passenger demand & status |
| `GET` | `/api/journeys` | List booked passenger journeys (filterable by `busId`) |
| `POST` | `/api/journeys` | Record a new passenger journey (`busNumber`, `fromStop`, `toStop`, `passengerCount`) |
| `DELETE` | `/api/journeys/:id` | Cancel a passenger journey |
| `POST` | `/api/seed` | Seed realistic demo journeys (Route 500 Silk Board corridor) |
| `POST` | `/api/reset` | Clear logged journeys |
| `GET` | `/api/health` | Health check and active database mode |

---

## ⚙️ Setup & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB (Optional)
If you have a local or cloud MongoDB instance (e.g. MongoDB Atlas), add it to your `.env` file:
```env
MONGODB_URI="mongodb://localhost:27017/buspulse"
```
*Note: If `MONGODB_URI` is omitted, BusPulse automatically runs using its embedded persistent local store (`data/buspulse_data.json`).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```
