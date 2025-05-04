// export default AuthPage;
import React, { useState, useEffect, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase-config";
import "./auth-page.css";
import { UserContext } from "../providers/User/UserProvider";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  // const [user, setUser] = useState<User | null>(null);
  const userContext = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (userContext.setUser)
        userContext.setUser(currentUser == null ? undefined : currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    console.log('email: ', email)
    console.log('password: ', password)
    console.log('email: ', email)
    console.log('password: ', password)
    console.log('auth: ', auth)
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        window.alert('logged in successfully')
        setEmail("");
        setPassword("");
        if (userContext.setUser)
          userContext.setUser(userCredentials.user);
        navigate('/patients')
      }).catch(error => {
        console.error("Login error:", error);
        window.alert('something went wrong')

      })
    // try {
    //   const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    // } catch (error) {
    // }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store name in Firestore
    await setDoc(doc(db, "therapists", user.uid), {
      name: name,
      email: email,
    })
      setEmail("");
      setPassword("");
      setName("");
      navigate('/patients')
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <p>welcome</p>
        <form
          className="login-form"
        // onSubmit={login}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name='email'
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <input
            type="password"
            name='password'
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Sign in</button>
          <button onClick={handleSignUp}>Sign up</button>
        </form>
      </div>
    </div>
  )
};

export default AuthPage;
