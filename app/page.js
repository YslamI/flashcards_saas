import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards to easy and effective study from your text" />
      </Head>

      <AppBar position="static" sx={{width: "100%"}}>
        <Toolbar color="cyan">
          <Typography variant="h6" width="100%" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit" width="11.2em">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box 
      sx={{textAlign: "center"}}>
        <Typography variant="h2">Welcome to Flashcard</Typography>
        <Typography variant="h5">
          {' '}
          Create flashcards in just one click
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}}>Get Started</Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" components="h2">
          Features
        </Typography>
        <Grid contained spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Magic Flashcards</Typography>
            <Typography>
              {' '}
              Input your text and see the magic of our app! Study faster and effectively from our flashcards!
            </Typography>
          </Grid>
        </Grid>
        <Grid contained spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our intelligent AI turns your text into keywords, perfect for studying 
            </Typography>
          </Grid>
        </Grid>
        <Grid contained spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Flashcards Everywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards anywhere, anytime, on any device!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
