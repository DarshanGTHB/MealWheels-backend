const uid = "PUT_FIREBASE_UID_HERE";

// Set custom claim
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Success: ${uid} is now an admin`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error setting admin claim:", error);
    process.exit(1);
  });