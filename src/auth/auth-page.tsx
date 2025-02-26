import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase-config"; 
import "./auth-page.css";

const AuthPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("Checking authentication state...");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    console.log("Attempting login with:", email, password);
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", credentials);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignUp = async () => {
    console.log("Attempting signup with:", email, password);
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful:", credentials);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLogout = async () => {
    console.log("Attempting logout...");
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container">
      <section id="user">
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          ""
        )}
      </section>

      <section id="auth">
        <h2>Login / Signup</h2>
        <form className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignUp}>Signup</button>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
