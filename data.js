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

    orders: [
        {
            status: "Looking for a booster",
            userId: "60ecdd01598a235944e3ec02",
            boosterId: "",
            chatId: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUW",
            boostType: "Rank Boosting",
            startRank: "Gold",
            startDivision: 1,
            rankRating: 30,
            desiredRank: "Immortal",
            desiredDivision: 3,
            games: 0,
            duoGame: false,
            chatOffine: false,
            specificAgents: true,
            priorityOrder: true,
            withStreaming: false,
            price: 71,
            payement: false,
            payementFullName: "",
            payementBillingAdress: "",
            payementCity: "",
            payementZipCode: "",
            payementAdress: "",
        },
        {
            status: "Looking for a booster",
            userId: "60ecdd01598a235944e3ec02",
            boosterId: "",
            chatId: "",
            account: "wahb",
            password: "testpassword",
            summoner: "WahbGrissa",
            server: "EUW",
            boostType: "Rank Boosting",
            startRank: "Silver",
            startDivision: 1,
            rankRating: 30,
            desiredRank: "Diamond",
            desiredDivision: 1,
            games: 0,
            duoGame: false,
            chatOffine: true,
            specificAgents: true,
            priorityOrder: true,
            withStreaming: true,
            price: 54,
            payement: false,
            payementFullName: "",
            payementBillingAdress: "",
            payementCity: "",
            payementZipCode: "",
            payementAdress: "",
        },
        {
            status: "In progress",
            userId: "60ecdd01598a235944e3ec02",
            boosterId: "60ecdd01598a235944e3ec03",
            chatId: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUW",
            boostType: "Rank Boosting",
            startRank: "Bronze",
            startDivision: 1,
            rankRating: 30,
            desiredRank: "Silver",
            desiredDivision: 3,
            games: 0,
            duoGame: false,
            chatOffine: false,
            specificAgents: true,
            priorityOrder: false,
            withStreaming: false,
            price: 23,
            payement: false,
            payementFullName: "",
            payementBillingAdress: "",
            payementCity: "",
            payementZipCode: "",
            payementAdress: "",
        },
        {
            status: "Finished",
            userId: "60ecdd01598a235944e3ec02",
            boosterId: "60ecdd01598a235944e3ec03",
            chatId: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUNE",
            boostType: "Placement Boosting",
            startRank: "Bronze",
            startDivision: 1,
            rankRating: 60,
            desiredRank: "Immortal",
            desiredDivision: 3,
            games: 0,
            duoGame: false,
            chatOffine: false,
            specificAgents: true,
            priorityOrder: false,
            withStreaming: false,
            price: 23,
            payement: true,
            payementFullName: "Maamoun Grissa",
            payementBillingAdress: "grissa.maamoun@gmail.com",
            payementCity: "Sousse",
            payementZipCode: "4000",
            payementAdress: "Khezama West",
        },           
    ],

    // Chat Seeder

    chat: [
        {
            userId: "60ecdd01598a235944e3ec02",
            orderId: "60ecddb037d2d55c30edaa37",
            message: "Test from customer",
        },
        {
            userId: "60ecd61ae67c204c189a526c",
            orderId: "60ecddb037d2d55c30edaa37",
            message: "Test from Booster",
        },
        {
            userId: "60ecdd01598a235944e3ec02",
            orderId: "60ecddb037d2d55c30edaa37",
            message: "Test From customer",
        },
        {
            userId: "60ecdd01598a235944e3ec00",
            orderId: "60ecddb037d2d55c30edaa37",
            message: "Test From admin",
        },        
    ],


    // BLOG SEEDER

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