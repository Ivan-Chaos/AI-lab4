import { async } from '@firebase/util';
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    getDoc,
    doc
} from 'firebase/firestore/lite';
import { db } from '../firebase-config';

export async function writeDiseases() {
    setDoc(doc(db, 'diseases', 'disease_list'), {
        list: [
            {
                name: 'Кір',
                key: 'measles',
                symptom_names: ['Температура', 'Нежить', 'Кашель', 'Різна висипка', 'Світлобоязнь'],
                symptoms: {
                    temperature: 20,
                    snots: 10,
                    cough: 10,
                    throat_ache: 0,
                    gland: 0,
                    suffocation: 0,
                    rash: 30,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 0,
                    chills: 0,
                    photosensitivity: 30
                },
                description: "Кір – це гостре вірусне захворювання, що супроводжується запальним ураженням верхніх дихальних шляхів, висипом і поширенням токсинів, що продукуються вірусом, по всьому організму. До створення вакцини проти кору, захворювання було широко поширене і було однією з основних причин смертності у маленьких дітей."
            },

            {
                name: 'Грип',
                key: 'flu',
                symptom_names: ['Температура', 'Нежить', 'Кашель', 'Головний біль', 'Озноб'],
                symptoms: {
                    temperature: 20,
                    snots: 10,
                    cough: 10,
                    throat_ache: 0,
                    gland: 0,
                    suffocation: 0,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 30,
                    chills: 30,
                    photosensitivity: 0
                },
                description: "Грип – гостре респіраторне вірусне захворювання з крапельним механізмом передачі, яке характеризується гострим початком, переважним ураженням верхніх дихальних шляхів і загальною інтоксикацією. Збудники хвороби – віруси, за типом вірусу А, В, С."
            },

            {
                name: 'Запалення легень',
                key: 'pneumonia',
                symptom_names: ['Температура', 'Кашель', 'Віддих', 'Озноб', "Головний біль"],
                symptoms: {
                    temperature: 20,
                    snots: 0,
                    cough: 20,
                    throat_ache: 0,
                    gland: 0,
                    suffocation: 30,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 15,
                    chills: 15,
                    photosensitivity: 0
                },
                description: "Пневмонія – це гостре інфекційне запалення легень, яке локалізується перш за все у альвеолах. У здорової людини альвеоли наповнені повітрям і нормально функціонують під час дихання. А у хворого на пневмонію у альвеолах накопичуються слиз та рідина, які обмежують надходження кисню."
            },

            {
                name: 'Ангіна',
                key: 'tonsillitis',
                symptom_names: ['Температура', 'Біль горла', 'Збільшення підчелюсних залоз', 'Головний біль', 'Озноб'],
                symptoms: {
                    temperature: 20,
                    snots: 0,
                    cough: 0,
                    throat_ache: 20,
                    gland: 30,
                    suffocation: 0,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 15,
                    chills: 15,
                    photosensitivity: 0
                },
                description: "Ангіна — це інфекційне запалення мигдалин, що передається повітряно-крапельним або іншими шляхами. Збудниками даного захворювання є стафілококи і стрептококи, які провокують утворення наростів і гнійних грудочок в області горла. Захворіти на ангіну можна, «підхопивши» вірус від уже зараженої людини, з якою ви недавно були в контакті, а також причиною раптової хвороби можуть стати не вимиті вчасно руки. На ангіну нерідко називають будь-які болі в горлі, що супроводжуються явним погіршенням загального стану. Насправді причиною цих явищ можуть бути інші хвороби, наприклад, застуда."
            },

            {
                name: 'Скарлатина',
                key: 'scarlet',
                symptom_names: ['Температура', 'Біль горла', 'Збільшення підчелюсних залоз', 'Різна висипка', 'Тошнота/рвота'],
                symptoms: {
                    temperature: 15,
                    snots: 0,
                    cough: 0,
                    throat_ache: 15,
                    gland: 10,
                    suffocation: 0,
                    rash: 30,
                    vomiting: 30,
                    ears_swelling: 0,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 0,
                    chills: 0,
                    photosensitivity: 0
                },
                description: "Скарлатина - інфекційне захворювання, що вражає горло, що супроводжується ангіною, інтоксикацією, лихоманкою і рясними точковими висипаннями. Найчастіше зустрічається у дитини у віці від 2 до 10 років."
            },

            {
                name: 'Свинка',
                key: 'mumps',
                symptom_names: ['Температура', 'Збільшення підчелюсних залоз', 'Опухлість завушних залоз'],
                symptoms: {
                    temperature: 30,
                    snots: 0,
                    cough: 0,
                    throat_ache: 0,
                    gland: 30,
                    suffocation: 0,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 40,
                    stomach_ache: 0,
                    intestants_disorder: 0,
                    skin_yellowing: 0,
                    headache: 0,
                    chills: 0,
                    photosensitivity: 0
                },
                description: ""
            },

            {
                name: 'Дезинтерія',
                key: 'dysentery',
                symptom_names: ['Температура', 'Болі в животі', 'Розклади кишківника'],
                symptoms: {
                    temperature: 20,
                    snots: 0,
                    cough: 0,
                    throat_ache: 0,
                    gland: 0,
                    suffocation: 0,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 40,
                    intestants_disorder: 40,
                    skin_yellowing: 0,
                    headache: 0,
                    chills: 0,
                    photosensitivity: 0
                },
                description: ""
            },

            {
                name: 'Гепатит',
                key: 'hepatitis',
                symptom_names: ['Болі в животі', 'Пожовтіння шкіри'],
                symptoms: {
                    temperature: 0,
                    snots: 0,
                    cough: 0,
                    throat_ache: 0,
                    gland: 0,
                    suffocation: 0,
                    rash: 0,
                    vomiting: 0,
                    ears_swelling: 0,
                    stomach_ache: 40,
                    intestants_disorder: 0,
                    skin_yellowing: 60,
                    headache: 0,
                    chills: 0,
                    photosensitivity: 0
                },
                description: "Гепатит — це захворювання печінки запального характеру, як правило, вірусного походження.Існує п’ять основних типів вірусів гепатиту: А, В, С, D і Е. Усі типи вірусів спричиняють захворювання печінки, але між ними є істотна різниця. Зокрема, типи В і С призводять до розвитку хронічного запалення печінки у мільйонів людей і є однією з головних причин цирозу та раку печінки."
            },
        ]
    });
}

export async function getDiseases() {
    try {
        const docRef = doc(db, "diseases", "disease_list");
        const docSnap = await getDoc(docRef);
        return docSnap.data().list
    }
    catch (error) {
        console.log("🚀 ~ file: firebaseDB.js ~ line 202 ~ getDiseases ~ error", error)
    }
}

export async function createUser(email, dob, gender){
    setDoc(doc(db, 'users', email), {
        dob: dob,
        gender: gender, 
        diagnostics: []
    })
}

export async function getUserDeseases(email){
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data().diagnostics;
    }
    catch (error) {
        console.log("🚀 ~ file: firebaseDB.js ~ line 202 ~ getDiseases ~ error", error)
    }
}

export async function getUserInfo(email){
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }
    catch (error) {
        console.log("🚀 ~ file: firebaseDB.js ~ line 202 ~ getDiseases ~ error", error)
    }
}

export async function addUserDisease(email, userInfo){
    await setDoc(doc(db, 'users', email), userInfo);
}

export async function diseaseModel(newModel){
    await setDoc(doc(db, 'diseases', 'disease_list'), {list: newModel});
}