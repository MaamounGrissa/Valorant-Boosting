// eslint-disable-next-line import/no-anonymous-default-export

import bcrypt from 'bcryptjs';

export default {

    users: [
        {
            name: 'Maamoun',
            email: 'grissa.maamoun@gmail.com',
            password: bcrypt.hashSync('Grissa1906', 8),
            rule: 'admin',
            photo: '/images/users/maamoun.png'
        },
        {
            name: 'Admin Account',
            email: 'udaniel91@gmail.com',
            password: bcrypt.hashSync('TESTDZ50302', 8),
            rule: 'admin',
        },
        {
            name: 'Client Account',
            email: 'novaccounts@yahoo.com',
            password: bcrypt.hashSync('TESTNZU9J02', 8),
            rule: 'client',
        },
        {
            name: 'Booster Account',
            email: 'koreyboosting@gmail.com',
            password: bcrypt.hashSync('rikat123', 8),
            rule: 'booster',
            rank: 'Diamon V',
            paypal: 'koreyboosting@gmail.com',
            percentage: '70',
        }
    ],

    blog: [
        {
            title: "Modern furnishing projects",
            news: "New furnishing ideas",
            image: "/images/projects/project-1.jpg",
            date: "19-06-1988"
        },
        {
            title: "Furnishing and complements",
            news: "Discover the design table collection",
            image: "/images/projects/project-2.jpg",
            date: "18-05-1988"
        },
        {
            title: "Which is Best for Your Home",
            news: "Wardrobes vs Walk-In Closets",
            image: "/images/projects/project-3.jpg",
            date: "21-05-1993"
        },        
    ],
}