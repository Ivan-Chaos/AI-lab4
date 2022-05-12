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
                description: ""
            },

            {
                name: 'Грип',
                key: 'flu',
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
                description: ""
            },

            {
                name: 'Запалення легень',
                key: 'pneumonia',
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
                description: ""
            },

            {
                name: 'Ангіна',
                key: 'tonsillitis',
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
                description: ""
            },

            {
                name: 'Скарлатина',
                key: 'scarlet',
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
                description: ""
            },

            {
                name: 'Свинка',
                key: 'mumps',
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
                description: ""
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

export async function getQuestions() {
    try {
        const questionsCollection = collection(db, 'questions');
        const questionsSnapshot = await getDocs(questionsCollection);
        let questionsList = questionsSnapshot.docs.map(doc => {
            return { ...doc.data(), key: doc.id };
        });

        questionsList.sort((a, b) => a.level - b.level);

        return questionsList;
    } catch (error) {
        debugger;
    }
}

export async function getAnswers() {
    try {
        const answersCollection = collection(db, 'answers');
        const answersSnapshot = await getDocs(answersCollection);
        let answersList = answersSnapshot.docs.map(doc => {
            return { ...doc.data() };
        });
        return answersList;
    } catch (error) {
        debugger;
    }
}

export async function writeQuestions() {
    setDoc(doc(db, 'questions', 'novice'), {
        name: 'Новачок',
        questions: [
            {
                text: 'Переживаєте за успіх в роботі',
                options: [
                    { text: 'Сильно', value: 5 },
                    { text: 'Не дуже', value: 3 },
                    { text: 'Спокійний', value: 2 }
                ]
            },

            {
                text: 'Прагнете досягти швидко результату',
                options: [
                    { text: 'Поступово', value: 2 },
                    { text: 'Якомога швидше', value: 3 },
                    { text: 'Дуже', value: 5 }
                ]
            },

            {
                text: 'Легко попадаєте в тупик при проблемах в роботі',
                options: [
                    { text: 'Неодмінно', value: 5 },
                    { text: 'Поступово', value: 3 },
                    { text: 'Зрідка', value: 2 },
                ]
            },

            {
                text: 'Чи потрібен чіткий алгоритм для вирішення задач',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'В окремих випадках', value: 3 },
                    { text: 'Не потрібен', value: 2 }
                ]
            }
        ]
    });

    setDoc(doc(db, 'questions', 'advanced_beginner'), {
        name: 'Твердий початківець',
        questions: [
            {
                text: 'Чи використовуєте власний досвід при вирішенні задач',
                options: [
                    { text: 'Зрідка', value: 5 },
                    { text: 'Частково', value: 3 },
                    { text: 'Ні', value: 2 }
                ]
            },

            {
                text: 'Чи користуєтесь фіксованими правилами  для вирішення задач',
                options: [
                    { text: 'Так', value: 2 },
                    { text: 'В окремих випадках', value: 3 },
                    { text: 'Не потрібні', value: 5 }
                ]
            },

            {
                text: 'Чи відчуваєте ви загальний контекст вирішення задачі',
                options: [
                    { text: 'Так', value: 2 },
                    { text: 'Частково', value: 3 },
                    { text: 'В окреми випадках', value: 5 }
                ]
            }
        ]
    });

    setDoc(doc(db, 'questions', 'competent'), {
        name: 'Компетентний',
        questions: [
            {
                text: 'Чи можете ви побудувати модель вирішуваної задачі',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Не повністю', value: 3 },
                    { text: 'В окремих випадках', value: 2 }
                ]
            },

            {
                text: 'Чи вистачає вам ініціативи при вирішенні задач',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Зрідка', value: 3 },
                    { text: 'Потрібне натхнення', value: 2 }
                ]
            },

            {
                text: 'Чи можете вирішувати проблеми, з якими ще не стикались',
                options: [
                    { text: 'Так', value: 2 },
                    { text: 'В окремих випадках', value: 3 },
                    { text: 'Ні', value: 5 }
                ]
            }
        ]
    });

    setDoc(doc(db, 'questions', 'proficient'), {
        name: 'Досвідчений',
        questions: [
            {
                text: 'Чи необхідний вам весь контекст задачі',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'В окремих деталях', value: 3 },
                    { text: 'В загальному', value: 2 }
                ]
            },

            {
                text: 'Чи переглядаєте ви свої наміри до вирішення задачі',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Зрідка', value: 3 },
                    { text: 'Коли є потреба', value: 2 }
                ]
            },

            {
                text: 'Чи здатні ви навчатись у інших',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Зрідка', value: 3 },
                    { text: 'Коли є потреба', value: 2 }
                ]
            }
        ]
    });

    setDoc(doc(db, 'questions', 'expert'), {
        name: 'Експерт',
        questions: [
            {
                text: 'Чи обираєте ви нові методи своєї роботи',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Вибірково', value: 3 },
                    { text: 'Вистачає досвіду', value: 2 }
                ]
            },

            {
                text: 'Чи допомагає власна інтуїція при вирішенні задач',
                options: [
                    { text: 'Так', value: 5 },
                    { text: 'Частково', value: 3 },
                    { text: 'При емоційному напруженні', value: 2 }
                ]
            },

            {
                text: 'Чи застовуєте рішення задач за аналогією',
                options: [
                    { text: 'Часто', value: 5 },
                    { text: 'Зрідка', value: 3 },
                    { text: 'Тільки власний варіант', value: 2 }
                ]
            }
        ]
    });
}

export async function getProgress(login) {
    try {
        const docRef = doc(db, "answers", login)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return undefined;
        }
    } catch (error) {

    }
}

export async function addAnswers(data, login) {
    await setDoc(doc(db, 'answers', login), data);
}