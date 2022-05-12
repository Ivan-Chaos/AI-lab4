import { useEffect, useMemo, useState } from 'react';
import { getDiseases, writeDiseases, diseaseModel } from '../../service/firebaseDB';
import DataGrid, { TextEditor } from 'react-data-grid';
import Button from '@mui/material/Button';

import classes from './Stats.module.scss'


const DiseasesModel = () => {

    const [rawDiseases, setRawDiseases] = useState([]);

    const [rows, setRows] = useState([]);

    const columns = [
        { key: 'symptoms', name: 'Симптоми' },
        { key: 'measles', name: 'Кір', editor: TextEditor },
        { key: 'flu', name: 'Грип', editor: TextEditor },
        { key: 'pneumonia', name: 'Запалення легень', editor: TextEditor },
        { key: 'tonsillitis', name: 'Ангіна', editor: TextEditor },
        { key: 'scarlet', name: 'Скарлатина', editor: TextEditor },
        { key: 'mumps', name: 'Свинка', editor: TextEditor },
        { key: 'dysentery', name: 'Дезинтерія', editor: TextEditor },
        { key: 'hepatitis', name: 'Гепатит', editor: TextEditor },
    ];

    //fetching properly arranged disease list (disease=>symptoms)
    useEffect(() => {
        getDiseases().then(diseaseArray => setRawDiseases(diseaseArray));
    }, [])

    //converting diseaseList to something suitable to use in data grid (symptom weight=>disease)
    useEffect(() => {
        let rows = [
            {
                symptoms: 'Температура', key: 'temperature'
            },
            { symptoms: 'Нежить', key: 'snots' },
            { symptoms: 'Кашель', key: 'cough' },
            { symptoms: 'Біль горла', key: 'throat_ache' },
            { symptoms: 'Підщелепні залози', key: 'gland' },
            { symptoms: 'Віддих', key: 'suffocation' },
            { symptoms: 'Висипка', key: 'rash' },
            { symptoms: 'Тошнота/рвота', key: 'vomiting' },
            { symptoms: 'Завушні залози', key: 'ears_swelling' },
            { symptoms: 'Болі в животі', key: 'stomach_ache' },
            { symptoms: 'Розлади кишківника', key: 'intestants_disorder' },
            { symptoms: 'Пожовтіння шкіри', key: 'skin_yellowing' },
            { symptoms: 'Головний біль', key: 'headache' },
            { symptoms: 'Озноб', key: 'chills' },
            { symptoms: 'Світлобоязнь', key: 'photosensitivity' }

        ];
        rawDiseases.forEach(disease => {
            for (const symptom in disease.symptoms) {
                rows[rows.findIndex(row => row.key === symptom)][disease.key] = disease.symptoms[symptom]
            }
        })

        setRows([...rows]);
    }, [rawDiseases])

    useEffect(() => {
        if (rows.length >= 1) {
            let updatedRawDisease = rawDiseases.map(disease => {
                let temp_symptoms = disease.symptoms;

                let temp_symptom_names = [];

                rows.forEach(rs => {
                    temp_symptoms[rs.key] = parseFloat(rs[disease.key]);
                    if (parseFloat(rs[disease.key]) !== 0)
                        temp_symptom_names.push(rs.symptoms);
                })

                return {
                    ...disease,
                    symptoms: temp_symptoms,
                    symptom_names: temp_symptom_names
                }
            })
            diseaseModel(updatedRawDisease);
        }


    }, [rows])


    return (<div className={classes.Stats}>
        <h1>Табличне представлення моделі  знань для задачі медичної діагностики</h1>
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
        <Button variant ="contained" onClick={()=>writeDiseases()}>Скинути</Button>
    </div>);
}

export default DiseasesModel;