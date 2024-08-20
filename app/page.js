'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards to easily and effectively study from your text" />
      </Head>

      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          {!isSignedIn ? (
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
          ) : (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Button sx={{ color: "inherit", ml: 2 }} href="/generate_flashcards">Generate Flashcards</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" paragraph>
          Create flashcards with just one click.
        </Typography>
        {!isSignedIn && (
          <Button variant="contained" color="primary" href="/sign-up" sx={{ mt: 2 }}>
            Get Started
          </Button>
        )}
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Magic Flashcards</Typography>
              <Typography>
                Input your text and experience the magic of our app! Study faster and more effectively with our flashcards!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Our intelligent AI turns your text into keywords, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Flashcards Everywhere</Typography>
              <Typography>
                Access your flashcards anywhere, anytime, on any device!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} textAlign="center">
            <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6">Basic Plan</Typography>
              <Typography variant="h6" color="textSecondary">Free</Typography>
              <Typography gutterBottom>
                Limited flashcards and storage.
              </Typography>
              {!isSignedIn && (
                <Button variant="contained" color="secondary">Choose Basic</Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, border: '2px solid primary.main' }}>
              <Typography variant="h6">Pro Plan</Typography>
              <Typography variant="h6" color="primary"> $15 / month</Typography>
              <Typography gutterBottom>
                Unlimited flashcard features and storage with primary support.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
