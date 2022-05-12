import { useEffect, useState } from 'react';
import { getDiseases } from '../../service/firebaseDB';
import DataGrid from 'react-data-grid';

import classes from './Stats.module.scss'


const DiseasesModel = () => {

    const [rawDiseases, setRawDiseases] = useState([]);

    const columns = [
        { key: 'symptoms', name: 'Симптоми' },
        {key: 'measles', name: 'Кір'},
        {key: 'flu', name: 'Грип'},
        {key: 'pneumonia', name: 'Запалення легень'},
        {key: 'tonsillitis', name: 'Ангіна'},
        {key: 'scarlet', name: 'Скарлатина'},
        {key: 'mumps', name: 'Свинка'},
        {key: 'dysentery', name: 'Дезинтерія'},
        {key: 'hepatitis', name: 'Гепатит'},
    ];
    const [rows, setRows] = useState([]);

    //fetching properly arranged disease list (disease=>symptoms)
    useEffect(() => {
        getDiseases().then(diseaseArray => setRawDiseases(diseaseArray));
    }, [])

    //converting diseaseList to something suitable to use in data grid (symptom weight=>disease)
    useEffect(() => {
        let rows = [
            {symptoms: 'Температура', key: 'temperature'},
            {symptoms: 'Нежить', key: 'snots'},
            {symptoms: 'Кашель', key: 'cough'},
            {symptoms: 'Біль горла', key: 'throat_ache'},
            {symptoms: 'Підщелепні залози', key: 'gland'},
            {symptoms: 'Віддих', key: 'suffocation'},
            {symptoms: 'Висипка', key: 'rash'},
            {symptoms: 'Тошнота/рвота', key: 'vomiting'},
            {symptoms: 'Завушні залози', key: 'ears_swelling'},
            {symptoms: 'Болі в животі', key: 'stomach_ache'},
            {symptoms: 'Розлади кишківника', key: 'intestants_disorder'},
            {symptoms: 'Пожовтіння шкіри', key: 'skin_yellowing'},
            {symptoms: 'Головний біль', key: 'headache'},
            {symptoms: 'Озноб', key: 'chills'},
            {symptoms: 'Світлобоязнь', key: 'photosensitivity'}

        ];
        rawDiseases.forEach(disease=>{
            
            for(const symptom in disease.symptoms){
                rows[rows.findIndex(row=>row.key===symptom)][disease.key] = disease.symptoms[symptom]
            }
        })

        setRows([...rows]);
    }, [rawDiseases])

    return (<div className={classes.Stats}>
        <h1>Табличне представлення моделі  знань для задачі медичної діагностики</h1>
        <DataGrid columns={columns} rows={rows} />
    </div>);
}

export default DiseasesModel;