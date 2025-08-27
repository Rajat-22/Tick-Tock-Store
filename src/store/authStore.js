import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { db, auth } from "@/utility/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ADMIN_ROLE, USER_ROLE } from "@/constants/productConstant";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const error = ref(null)
    const isLoading = ref(false)
    const role = ref(null)
    const initialized = ref(false)
    const isAuthenticated = computed(()=> user.value !== null)
    const isAdmin = computed(()=> role.value === ADMIN_ROLE)

    const initializeAuth = async () => {
        onAuthStateChanged(auth, async(userInFirebase) => {
            if(userInFirebase){
                user.value = userInFirebase
                initialized.value = true
            }else {
                user.value = null
                role.value = null
            }
        })
    }

    const signUpUser = async(email, password) => {
        isLoading.value = true
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
          await setDoc(doc(db, 'users', userCredentials.user.uid), {
               email : userCredentials.user.email,
               role: USER_ROLE,
               createdAt: new Date()
          }) 
           
            user.value = null
            role.value = null
            error.value = null
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

     const signInUser = async(email, password) => {
        isLoading.value = true
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            user.value = userCredentials.user
            user.role = USER_ROLE
            error.value = null
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const signOutUser = async() => {
        isLoading.value = true
        try {
            await signOut(auth)
            user.value = null
            role.value = null
            error.value = null
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return { 
        user, error,isLoading, role, initialized, 

        isAdmin, isAuthenticated,

        signUpUser, signInUser, initializeAuth, signOutUser}
})