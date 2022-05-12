import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { addAnswers, getDiseases, getProgress, getQuestions, writeDiseases, writeQuestions } from '../../service/firebaseDB'
import { setQuizQuestions } from '../../store/slices/quizSlice';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })



    useEffect(() => {
        
        
    }, []);



    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Ласкаво просимо, <span>{user?.email}</span></h1>
        </header>
        <main>
            <h1>Історія діагностик</h1>

            <button>Пройти діагностику</button>

            <button onClick={()=>{
                writeDiseases();
            }}>FUCK</button>
        </main>
    </div>);
}

export default UserMainPage;