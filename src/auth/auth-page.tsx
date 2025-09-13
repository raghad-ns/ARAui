import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import "./auth-page.css";
import { UserContext } from "../providers/User/UserProvider";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Fetch therapist data by ID from Firestore
  const getTherapistById = async (therapistId:any) => {
    try {
      const docRef = doc(db, "therapists", therapistId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting therapist:", error);
      return null;
    }
  };

  // Persist user after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && userContext.setUser) {
        const therapist = await getTherapistById(currentUser.uid);
        if (therapist) {
          userContext.setUser(therapist);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle login
  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");

      const therapist = await getTherapistById(userCredentials.user.uid);
      if (therapist && userContext.setUser) {
        userContext.setUser(therapist);
      }
      if (therapist && userContext.setUser) {
    console.log("Setting user context with: ", therapist);
    userContext.setUser(therapist);
}

   console.log("Therapist data from Firestore: ", therapist);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle sign-up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Firestore
      await setDoc(doc(db, "therapists", user.uid), {
        name: name,
        email: email,
      });

      if (userContext.setUser) {
        userContext.setUser({ name: name, email: email });
      }

      setEmail("");
      setPassword("");
      setName("");
      console.log("User after signup: ", { name, email });

      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
    
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (userContext.setUser) {
        userContext.setUser(undefined);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        {!userContext.user && (
          <>
            <p>{isLogin ? "Login to ARA" : "Sign up for ARA"}</p>
            <div className="login-form">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {isLogin ? (
                <button onClick={handleLogin}>Login</button>
              ) : (
                <button onClick={handleSignUp}>Signup</button>
              )}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create an account" : "Have an account? Login"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
