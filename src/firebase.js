import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6K3GO43nTARo_bG3-noC_F9-bnrHlKm0",
  authDomain: "netflix-clone-62191.firebaseapp.com",
  projectId: "netflix-clone-62191",
  storageBucket: "netflix-clone-62191.appspot.com",
  messagingSenderId: "862815053889",
  appId: "1:862815053889:web:83c56d0d5a0d58d0323ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        }) 
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(' '));
        
    }

}

const login = async (email, password) =>{
    console.log(email);
    

    try {

        await signInWithEmailAndPassword(auth, email, password);
        
    } catch (error) {
        
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(' '));

        
    }

}

const logout = () =>{

    signOut(auth)
}

export {auth, db, login, signup, logout};