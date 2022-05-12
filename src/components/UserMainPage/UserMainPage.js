import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { getUserDeseases, getUserInfo, writeDiseases, addUserDisease } from '../../service/firebaseDB'
import { setTakenAt } from '../../store/slices/diagnosisSlice';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const [user, setUser] = useState(null);

    const [userDiseases, setUserDiseases] = useState([]);

    const [userInfo, setUserInfo] = useState({
        dob: '',
        gender: 'male',
        diagnostics: []
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })



    useEffect(() => {
        if (user) {
            getUserDeseases(user.email).then(diseases => {
                setUserDiseases([...diseases]);
            });

            getUserInfo(user.email).then(info => {
                setUserInfo(info)
            })
        }

    }, [user]);

    const gender_mapping = {
        male: 'чоловіча',
        female: 'жіноча',
        attack_helicopter: 'бойовий вертоліт'
    }

    const delete_item = (taken_at) => {
        let tUserInfo = userInfo;

        tUserInfo.diagnostics = userInfo.diagnostics.filter(element => element.taken_at !== taken_at);

        addUserDisease(user.email, tUserInfo).then(() => {
            getUserInfo(user.email).then(info => {
                setUserInfo(info)

            })
        });
    }

    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Ласкаво просимо, <span>{user?.email}</span></h1>
            <h2>Дата народження <b>{(new Date(userInfo.dob)).toLocaleDateString("en-GB")}</b></h2>
            <h2>Стать: <b>{gender_mapping[userInfo.gender]}</b></h2>
        </header>
        <main>
            <h1>Історія діагностик</h1>
            {
                userInfo.diagnostics.map(element => {
                    debugger;
                    return <><div className={classes.diagnosticDiv}>
                        <h2>Діагностика від {(new Date(element.taken_at)).toLocaleDateString("en-GB")}</h2>

                        <div>
                            <Button variant="contained" onClick={()=>{
                                dispatch(setTakenAt(element.taken_at))
                                navigate('/diagnostics')
                            }} color="success" style={{ marginRight: '1em' }}>Переглянути</Button>
                            <Button color="error" onClick={() => delete_item(element.taken_at)}>Видалити</Button>
                        </div>

                    </div>

                    </>
                })
            }

            <Button onClick={() => {
                dispatch(setTakenAt(null))
                navigate('/diagnostics')
            }}>Пройти діагностику</Button>

        </main>
    </div>);
}

export default UserMainPage;