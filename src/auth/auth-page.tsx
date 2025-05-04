// export default AuthPage;
import React, { useState, useEffect, useContext } from "react";
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
      console.log('email: ', email)
      console.log('password: ', password)
      await createUserWithEmailAndPassword(auth, email, password);
      window.alert('signed up successfully')
      setEmail("");
      setPassword("");
      navigate('/patients')
    } catch (error) {
      console.error("Signup error:", error.message);
      window.alert('something went wrong')
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // return (
  //   <div className="auth-wrapper">
  //     <img src="/araLogo.png" alt="ARA Logo" className="logo" />
  //     <div className="auth-card">
  //       {!user ? (
  //         <>
  //           <h2>Welcome to ARA</h2>
  //           <div className="auth-form">
  //             <input
  //               type="email"
  //               placeholder="Email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //             <input
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //             <div className="button-group">
  //               <button onClick={handleLogin}>Login</button>
  //               <button onClick={handleSignUp}>Signup</button>
  //             </div>
  //           </div>
  //         </>
  //       ) : (
  //         <div className="welcome">
  //           <h2>Welcome,</h2>
  //           <p>{user.email}</p>
  //           <button onClick={handleLogout}>Logout</button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="login">
      <div className="form">
        <p>welcome</p>
        <form
          className="login-form"
        // onSubmit={login}
        >
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
