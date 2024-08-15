import { SignUp } from '@clerk/nextjs'
import {AppBar, Container, Toolbar, Typography, Button, Link, Box} from '@mui/material'
import { Butterfly_Kids } from 'next/font/google'

export default function SignUpPage() {
    return (
    <Container width= "100vw">
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{flexGrow: 1}}>
                    Flashcard SaaS
                </Typography>
                <Button>
                    <Link href="/sign-in" passhref>
                        Login
                    </Link>
                </Button>
                <Button>
                    <Link href="/sign-up" passhref>
                        Sign Up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
            <Typography variant='h4'>Sign Up</Typography>
            <SignUp />
        </Box>
    </Container>
    )
}