import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase-config';

import PersonIcon from '@mui/icons-material/Person';
import classes from './BaseLayout.module.scss';
import { useNavigate } from 'react-router-dom';


const BaseLayout = (props) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    const logout = async ()=>{
        await signOut(auth);
    }

    return (<div className={classes.BaseLayout}>
        <nav>
            <h1 onClick={()=>navigate('/')}>Chaus MD🏥</h1>
            {user && 
                <div className={classes.userDiv}>
                    <div className={classes.link} onClick={()=>navigate('/diseases-model')}>Diseases model</div>
                    <PersonIcon className={classes.personIcon}/>
                    <div className={classes.username} onClick={()=>navigate('/')}>{user.email.replace('@lab1.com', '')}</div>
                    <div className={classes.logout} onClick={()=>logout()}>Log out</div>
                </div>
            }

            {!user &&
                <div className={classes.userDiv}>
                    <div className={classes.link} onClick={()=>navigate('/diseases-model')}>Diseases model</div>
                    <div className={classes.logout} onClick={()=>navigate('/login')}>Sign in</div>
                </div>
            }
        </nav>

        <main>
            {props.children}
        </main>

        
        
        
    
    </div>);
}
 
export default BaseLayout;