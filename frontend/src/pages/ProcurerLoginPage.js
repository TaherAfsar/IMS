import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link, Container, Typography, Divider, InputAdornment, Stack, Button, TextField, IconButton } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

const role = localStorage.getItem('role');
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ProcurerLoginPage() {
    const label = {
        marginTop: "0px"
    }
    const mdUp = useResponsive('up', 'md');

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleClick = async () => {
        try {
            const apiUrl = 'http://192.168.151.85:4000/user/login';
            const loginData = {
                email,
                password,
            };

            const response = await axios.post(apiUrl, loginData);
            const token = response.data.token;
            localStorage.setItem('procurer', role);
            localStorage.setItem('token', token);
            navigate('/ProcurerHome', { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title> Login | CodeNando </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm" minHeight="0" >
                    <StyledContent minHeight="0" sx={{ justifyContent: "center" }} >
                        <Typography variant="h4" gutterBottom >
                            Login to your account
                        </Typography>



                        <Stack spacing={3}>
                            {/* Add onChange handlers to update email and password state */}
                            <TextField name="email" label="Email" style={label} onChange={handleEmailChange} value={email} />

                            <TextField
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handlePasswordChange} // Update password state
                                value={password} // Bind value to the password state
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Stack>
                        <Stack>
                            <br />
                            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                                Login
                            </Button>
                        </Stack>

                    </StyledContent>
                </Container>
            </StyledRoot >
        </>
    );
}
