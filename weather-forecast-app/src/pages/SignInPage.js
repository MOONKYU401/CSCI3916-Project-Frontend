import React from "react";

export default function SignInPage() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" style={{ display: "block", margin: "10px 0" }} />
      <input type="password" placeholder="Password" style={{ display: "block", margin: "10px 0" }} />
      <button>Sign In</button>
    </div>
  );
}
