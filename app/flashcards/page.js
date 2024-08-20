'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardActionArea, Container, Grid, Typography, Button, Box, AppBar, Toolbar } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!isSignedIn || !user) return

            // Get user document reference using user ID
            const docRef = doc(db, 'users', user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }

        getFlashcards()
    }, [isSignedIn, user]) // Dependencies: re-run when user or isSignedIn changes

    if (!isLoaded || !isSignedIn) {
        return <></> // Return empty if user is not signed in or data is not loaded
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="lg">
            <AppBar position="static" sx={{ mb: 4, bgcolor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <Button color="inherit" href="/">Home</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Your Flashcards
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Click on a flashcard to view details.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant='h6' align="center">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
