// import React, { useState, useEffect } from "react";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
// import { auth } from "../firebase-config"; 
// import "./auth-page.css";

// const AuthPage: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     console.log("Checking authentication state...");
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth State Changed:", currentUser);
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogin = async () => {
//     console.log("Attempting login with:", email, password);
//     try {
//       const credentials = await signInWithEmailAndPassword(auth, email, password);
//       console.log("Login successful:", credentials);
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const handleSignUp = async () => {
//     console.log("Attempting signup with:", email, password);
//     try {
//       const credentials = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("Signup successful:", credentials);
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error("Signup error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     console.log("Attempting logout...");
//     try {
//       await signOut(auth);
//       console.log("Logout successful");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <section id="user">
//         {user ? (
//           <div>
//             <p>Welcome, {user.email}</p>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           ""
//         )}
//       </section>

//       <section id="auth">
//         <h2>Login / Signup</h2>
//         <form className="auth-form">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </form>
//         <div>
//           <button onClick={handleLogin}>Login</button>
//           <button onClick={handleSignUp}>Signup</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AuthPage;
import React, { useState, useEffect } from "react";
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

const AuthPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };


const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store name in Firestore
    await setDoc(doc(db, "therapists", user.uid), {
      name: name,
      email: email,
    });

    setEmail("");
    setPassword("");
    setName("");
  } catch (error) {
    console.error("Signup error:", error);
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
    <div className="auth-wrapper">
    <img src="/araLogo.png" alt="ARA Logo" className="logo" />
    <div className="auth-card">
      {!user ? (
        <>
          <h2>{isLogin ? "Login to ARA" : "Sign up for ARA"}</h2>
          <div className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
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
  
            <div className="button-group">
              {isLogin ? (
                <button onClick={handleLogin}>Login</button>
              ) : (
                <button onClick={handleSignUp}>Signup</button>
              )}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create an account" : "Have an account? Login"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="welcome">
          <h2>Welcome,</h2>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default AuthPage;
