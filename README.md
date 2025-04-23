## Media Gallery App

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js
- MySQL
- npm or yarn

### 🔍 Environment Setup

1. Clone the repo:
   ```
   git clone https://github.com/Padmavathi-SJ/Media_Gallery_App.git
   cd Media_Gallery_App
   ```
   
2. Install dependencies:

```
cd client
npm install

cd ../server
npm install
```

3. Setup MySQL Database:

Import the SQL schema from /server/database/schema.sql
Update .env with your DB credentials.

4. Run backend:
```
cd server
npm start
```

5. Run frontend:
```
cd client
npm run dev
Visit: http://localhost:5173
```

📌 Future Enhancements
Album Creation: Allow users to create albums for specific events or celebrations.

Real-time Chat: Implement chat functionality for members to discuss events and activities in real-time.

Admin Dashboard: Create a more advanced admin dashboard for better control over image moderation and approval.

Image Download: Enable users to download images directly from the gallery.

Search Functionality: Improve the search to filter images by tags, events, and descriptions.


