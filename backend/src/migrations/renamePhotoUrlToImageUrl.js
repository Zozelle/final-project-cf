const mongoose = require('mongoose');
const connectDB = require('../db');

async function migrate() {
  await connectDB();

  const result = await mongoose.connection.db.collection('cats').updateMany(
    { photoUrl: { $exists: true } },
    { $rename: { photoUrl: 'imageUrl' } }
  );

  console.log(`Renamed ${result.modifiedCount} documents`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed', err);
  process.exit(1);
});
