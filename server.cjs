require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Try to require the JS build output if it exists, otherwise require TS directly (for dev)
let stripeRoutes;
try {
  stripeRoutes = require('./src/server/stripeRoutes.js').default;
} catch (e) {
  stripeRoutes = require('./src/server/stripeRoutes.ts').default;
}

const app = express();
app.use(cors());
app.use(express.json());

// Mount Stripe API endpoints
app.use('/api', stripeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
