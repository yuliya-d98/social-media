import React from "react";
import s from './user.module.css';

// const yuliya = {
//     name: 'Yuliya', 
//     birth: '07.30.1998', 
//     city: 'Minsk', 
//     education: `BNTU'20`, 
//     site: 'https://github.com/yuliya-d98/',
// }

const User = ({name = 'Yuliya', birth = '30.07.1998', city = 'Minsk', education = `BNTU'20`, site = 'https://github.com/yuliya-d98/'} = {}) => {
    return (
        <div className={s.user}>
            <img className={s.image} src="https://sib.fm/storage/article/April2021/Kb1KiTYol9I62IHiyBgV.jpeg" alt="user" />
            <div>
                <h2 className={s.header}>{name}</h2>
                <p className={s.text}>{`Date of Birth: ${birth}`}</p>
                <p className={s.text}>{`City: ${city}`}</p>
                <p className={s.text}>{`Education: ${education}`}</p>
                <p className={s.text}>
                    {`Site: `}
                    <a className={s.text} href={site} target='_blank' rel="noreferrer">{site}</a>
                </p>
            </div>
        </div>
    )
}

export default User;