
'use client'
import { useUser } from "@clerk/nextjs"
import { Button, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { Container, Box } from "@mui/system"
import { collection, DocumentReference, getDoc, writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Generate() {
    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data))
    }

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    } 

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if(!name) {
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()){
            const collections = docSnap.data().flashcards || []
            if(collections.find((f) => f.name === name)){
                alert("Flashcard collection with this name already exists")
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else{
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(useDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return(
        <Container maxWidth="max">
            <Box
            sx={{
                mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: "center"
            }}>
                <Typography variant="h4">Generate Flashcards</Typography>
                <Paper sx={{p: 4, width: "100%"}}>
                    <TextField value={text} onChange={(e) => setText(e.target.value)} label="Enter Text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{mb: 2}}
                        />
                    <Button variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth>
                        {' '}
                        Submit
                    </Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box sx={{mt: 4}}>
                    <Typography variant="h5">Flashcard Preview</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => {
                                    handleCardClick(index)
                                }}>
                                    <CardContent>
                                        <Box sx={{perspective: "1000px",
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                transform: flipped[index]
                                                    ? 'rotateY(180deg)' 
                                                    : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box'
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box xs={{md: 4, display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" color="secondary" onClick={handleOpen}>
                            Save
                            </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of your flashcard collections
                    </DialogContentText>
                    <TextField
                    autofocus
                    margin="dense"
                    label="Collection Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}