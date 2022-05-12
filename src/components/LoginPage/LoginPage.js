import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUser } from "../../service/firebaseDB";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import classes from './LoginPage.module.scss'

const LoginPage = () => {
    const navigate = useNavigate();


    const [isRegisterForm, setIsRegisterForm] = useState(false);
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState('male');


    const [password, setPassword] = useState(undefined);
    const [username, setUsername] = useState(undefined);

    const [error, setError] = useState(undefined);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser)
            navigate('/');
    });


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            )

            createUser(username, dob.toString(), gender);

        } catch (error) {
            debugger
            if (error?.code?.includes('weak-password')) {
                setError("Password should be at least 6 symbols");
            } else if (error?.code?.includes('invalid-email')) {
                setError("Incorrect email")
            } else if (error?.code?.includes('email-already-in-use')) {
                setError("Email taken")
            }
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                username,
                password
            )
        } catch (error) {
            if (error?.code?.includes('user-not-found')) {
                setError("Email does not exist");
            } else if ('user-not-found') {
                setError('Inccorrect password')
            }
        }
    }

    return (<div className={classes.LoginPage}>
        <div className={classes.LoginPanel}>
            <header>
                <h1>
                    {isRegisterForm ? 'Create an account' : 'Login'}
                </h1>
            </header>
            <hr />
            <main>



                <TextField
                    className={classes.inputs}
                    label="E-mail"
                    onChange={(e) => {
                        setError(undefined);
                        setUsername(e.target.value);
                    }}
                />

                <TextField
                    className={classes.inputs}
                    label="Password"
                    type="password"
                    onChange={(e) => {
                        setError(undefined);
                        setPassword(e.target.value);
                    }}
                />

                {
                    isRegisterForm &&
                    <>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of birth"
                                value={dob}
                                onChange={(newValue) => {
                                    setDob(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} className={classes.inputs} />}
                            />
                        </LocalizationProvider>

                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={gender}
                                onChange={(event)=>setGender(event.target.value)}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="attack_helicopter" control={<Radio />} label="Atttack helicopter" />

                            </RadioGroup>
                        </FormControl>
                    </>
                }


                <p>{error}</p>
            </main>

            <footer>
                <Button
                    className={classes.buttons}

                    onClick={() => setIsRegisterForm(!isRegisterForm)}
                >
                    {isRegisterForm ? "Return to login" : "Sign up"}
                </Button>

                <Button
                    className={classes.buttons}
                    variant="contained"
                    onClick={() => isRegisterForm ? register() : login()}
                >
                    {isRegisterForm ? "Register" : "Log in"}
                </Button>
            </footer>
        </div>
    </div>);
}

export default LoginPage;