'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useInsertionEffect, useState } from "react"

import { CollectionReference, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"

export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'))
            
        }
    })
}