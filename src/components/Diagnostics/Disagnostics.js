import classes from './Diagnostics.module.scss';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getDiseases } from '../../service/firebaseDB';


const Diagnostics = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [diseases, setDiseases] = useState([]);

    const [isDiagnosed, setIsDiagnosed] = useState(false);
    const [diagnosis, setDiagnosis] = useState({
        userSymptoms: symptoms
    });
    

    useEffect(()=>{
        getDiseases().then(disease_list=>{
            setDiseases(disease_list);
        })
    }, [])

    const handleCheck = (event, symptom) => {
        if (!event.target.checked) {
            setSymptoms(symptoms.filter(e => e !== symptom))
        }
        else {
            setSymptoms([...symptoms, symptom]);
        }
    }

    const diagnose = ()=>{
        let probabilites = diseases.map(disease=>{
            let probability =0;

            symptoms.forEach(symptom=>{
                probability+=disease.symptoms[symptom];
            })

            return {
                name: disease.name,
                key: disease.key,
                probability: probability
            }
        })

        setDiagnosis({
            ...diagnosis,
            probabilites: probabilites.filter(probability=>probability.probability>0).sort((a ,b)=>b.probability-a.probability),
            taken_at: new Date(Date.now()).toString()
        })
    }

    useEffect(()=>{
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
                    <FormControlLabel control={<Checkbox checked={symptoms.includes("suffocation")} onChange={(event) => handleCheck(event, 'suffocation')} />} label="Віддишка" />
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
            </>
        }


        <Button 
            variant="contained"
            onClick={()=>{
                diagnose();
                setIsDiagnosed(true);
            }}
        >
            Що зі мною не так???
        </Button>
    </div>);
}

export default Diagnostics;