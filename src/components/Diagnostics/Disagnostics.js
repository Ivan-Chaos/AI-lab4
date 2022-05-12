import classes from './Diagnostics.module.scss';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { addUserDisease, getDiseases, getUserInfo } from '../../service/firebaseDB';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';


const Diagnostics = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const [userInfo, setUserInfo] = useState(null);

    const taken_at = useSelector(state => state.diagnosis.taken_at);

    const navigate = useNavigate();

    const [isDiagnosed, setIsDiagnosed] = useState(false);
    const [diagnosis, setDiagnosis] = useState({
        userSymptoms: symptoms,
        probabilites: []
    });

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const mapping = {
        temperature: "Температура",
        snots: "Нежить",
        cough: "Кашель",
        throat_ache: "Біль горла",
        gland: "Збільшення підчелюсних залоз",
        suffocation: "Віддих",
        rash: "Різна  висипка",
        vomiting: "Тошнота/рвота",
        ears_swelling: "Опухлість завушних залоз",
        stomach_ache: "Болі в животі",
        intestants_disorder: "Розлади кишківника",
        skin_yellowing: "Пожовтіння шкіри",
        headache: "Головний біль",
        chills: "Озноб",
        photosensitivity: "Світлобоязнь"
    }

    const reverse_mapping = {
        "Температура" : "temperature",
        "Нежить" : "snots",
        "Кашель" : "cough",
        "Біль горла" : "throat_ache",
        "Збільшення підчелюсних залоз" : "gland",
        "Віддих" : "suffocation",
        "Різна  висипка" : "rash",
        "Тошнота/рвота" : "vomiting",
        "Опухлість завушних залоз": "ears_swelling",
        "Болі в животі" : "stomach_ache",
        "Розлади кишківника" : "intestants_disorder",
        "Пожовтіння шкіри" : "skin_yellowing",
        "Головний біль" : "headache",
        "Озноб": "chills",
        "Світлобоязнь" : "chills"
    }

    useEffect(() => {
        getDiseases().then(disease_list => {
            setDiseases(disease_list);
        })
    }, [])

    useEffect(() => {
        if (user)
            getUserInfo(user.email).then((userInfo) => {
                setUserInfo({ ...userInfo });
            })

    }, [user])

    useEffect(() => {
        if (userInfo) {
            if (taken_at) {
                setIsDiagnosed(true);
                setDiagnosis(userInfo.diagnostics.find(element => element.taken_at === taken_at));
                setSymptoms(userInfo.diagnostics.find(element => element.taken_at === taken_at).userSymptoms.map(e=>reverse_mapping[e]));
            }
        }
    }, [userInfo])

    const handleCheck = (event, symptom) => {
        if (!event.target.checked) {
            setSymptoms(symptoms.filter(e => e !== symptom))
        }
        else {
            setSymptoms([...symptoms, symptom]);
        }
    }

    const diagnose = () => {
        let probabilites = diseases.map(disease => {
            let probability = 0;

            symptoms.forEach(symptom => {
                probability += disease.symptoms[symptom];
            })

            return {
                name: disease.name,
                key: disease.key,
                symptom_names: disease.symptom_names,
                description: disease.description,
                probability: probability
            }
        })

        setDiagnosis({
            ...diagnosis,
            userSymptoms: symptoms.map(symptom=>mapping[symptom]),
            probabilites: probabilites.filter(probability => probability.probability > 0).sort((a, b) => b.probability - a.probability),
            taken_at: new Date(Date.now()).toString()
        })

        let tUserInfo = userInfo;

        tUserInfo.diagnostics.push({
            ...diagnosis,
            userSymptoms: symptoms.map(symptom=>mapping[symptom]),
            probabilites: probabilites.filter(probability => probability.probability > 0).sort((a, b) => b.probability - a.probability),
            taken_at: new Date(Date.now()).toString()
        });

        addUserDisease(user.email, tUserInfo);
    }

    useEffect(() => {
        console.log("🚀 ~ file: Disagnostics.js ~ line 61 ~ Diagnostics ~ diagnosis", diagnosis)
    }, [diagnosis])



    return (<div className={classes.Diagnostics}>
        {
            !isDiagnosed &&
            <>
                <h1>Будь ласка, вкажіть ваші симптоми</h1>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("temperature")} onChange={(event) => handleCheck(event, 'temperature')} />} label="Температура" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("snots")} onChange={(event) => handleCheck(event, 'snots')} />} label="Нежить" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("cough")} onChange={(event) => handleCheck(event, 'cough')} />} label="Кашель" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("throat_ache")} onChange={(event) => handleCheck(event, 'throat_ache')} />} label="Біль горла" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("gland")} onChange={(event) => handleCheck(event, 'gland')} />} label="Збільшення підщелепних залоз" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("suffocation")} onChange={(event) => handleCheck(event, 'suffocation')} />} label="Віддих" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("rash")} onChange={(event) => handleCheck(event, 'rash')} />} label="Висипка" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("vomiting")} onChange={(event) => handleCheck(event, 'vomiting')} />} label="Тошнота/рвота" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("ears_swelling")} onChange={(event) => handleCheck(event, 'ears_swelling')} />} label="Опухлість завушних залоз" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("stomach_ache")} onChange={(event) => handleCheck(event, 'stomach_ache')} />} label="Болі в животі" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("intestants_disorder")} onChange={(event) => handleCheck(event, 'intestants_disorder')} />} label="Розлади кишківника" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("skin_yellowing")} onChange={(event) => handleCheck(event, 'skin_yellowing')} />} label="Пожовтіння шкіри" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("headache")} onChange={(event) => handleCheck(event, 'headache')} />} label="Головний біль" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("chills")} onChange={(event) => handleCheck(event, 'chills')} />} label="Озноб" />
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("photosensitivity")} onChange={(event) => handleCheck(event, 'photosensitivity')} />} label="Світлобоязнь" />
                </FormGroup>

                <Button
                    variant="contained"
                    onClick={() => {
                        diagnose();
                        setIsDiagnosed(true);
                    }}
                >
                    Що зі мною не так???
                </Button>
            </>
        }

        {
            isDiagnosed &&
            <>
                <h1>Ваші симптоми:</h1>
                <ul>
                    {symptoms.map(name => <li>{mapping[name]}</li>)}
                </ul>

            </>
        }

        {
            diagnosis.probabilites.filter(disease => disease.probability == 100).length === 1 && isDiagnosed &&
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/309/389/982.png"></img>
                </div>

                <h1>Вітаю! У вас {diagnosis.probabilites[0].name.toLowerCase()}(100%)</h1>
                <h2>Симптоми</h2>
                <ul>
                    {diagnosis?.probabilites[0]?.symptom_names?.map(name => <li>{name}</li>)}
                </ul>

                <p>{diagnosis.probabilites[0].description}</p>
            </>
        }

        {
            diagnosis.probabilites.filter(disease => disease.probability == 100).length !== 1
            && diagnosis.probabilites.filter(disease => disease.probability == 100).length !== diseases.length
            && isDiagnosed &&
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/309/389/982.png"></img>
                </div>

                <h1>Ми не можемо вам поставити чіткий діагноз, але ось що з вами може бути не так:</h1>

                {
                    diagnosis.probabilites.map(disease => {
                        return (
                            <>
                                <h1><span style={{ color: '#c98300' }}> {disease.name}</span> з ймовірністю {disease.probability} %</h1>
                                <h2>Симптоми</h2>
                                <ul>
                                    {disease?.symptom_names?.map(name =>
                                        <li style={{ color: symptoms.findIndex(symptom => mapping[symptom] == name) >= 0 ? '#2cf71e' : 'black' }}>{name}</li>
                                    )}
                                </ul>

                                <p>{disease.description}</p>
                                <hr />
                            </>
                        )
                    })
                }

            </>
        }


        { diagnosis.probabilites.filter(disease => disease.probability == 100).length === diseases.length && isDiagnosed &&
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="https://media.istockphoto.com/photos/stairs-leading-up-to-heavenly-sky-toward-the-light-picture-id954305374?k=20&m=954305374&s=612x612&w=0&h=rV4oyHOtL547zWbGtTTwT8XCfEfWZkJorI7_ABGIiMM="></img>
                </div>

                <h1>Вічная пам'ять</h1>

                {
                    diagnosis.probabilites.map(disease => {
                        return (
                            <>
                                <h1><span style={{ color: '#c98300' }}> {disease.name}</span> з ймовірністю {disease.probability} %</h1>
                                <h2>Симптоми</h2>
                                <ul>
                                    {disease?.symptom_names?.map(name =>
                                        <li style={{ color: symptoms.findIndex(symptom => mapping[symptom] == name) >= 0 ? '#2cf71e' : 'black' }}>{name}</li>
                                    )}
                                </ul>

                                <p>{disease.description}</p>
                                <hr />
                            </>
                        )
                    })
                }

            </>
        }

        {
            isDiagnosed &&
            <Button variant="contained" onClick={() => navigate('/')}>На головну</Button>
        }

    </div>);
}

export default Diagnostics;