import admin from "./firebase.js";

const uid = "bPOcTYuKmPStsoZAqEOotCOoln72";

// Step 1: Set custom claim
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Success: ${uid} is now an admin`);
    return listAdmins(); // Step 2: List all admins
  })
  .then(() => {
    console.log("✔️ Done listing admins");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });

// Step 2: Function to list all admins  
async function listAdmins(nextPageToken) {
  const result = await admin.auth().listUsers(1000, nextPageToken);
  result.users.forEach(user => {
    const claims = user.customClaims || {};
    if (claims.admin) {
      console.log(`🔐 Admin: ${user.email || "(No email)"} (${user.uid})`);
    }
  });

  if (result.pageToken) {
    return listAdmins(result.pageToken);
  }
}
