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
            user_id: "60e8742f6ed6d629dc46ce7b",
            booster_id: "",
            chat_id: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUW",
            boost_type: "Rank Boosting",
            start_rank: "Gold",
            start_division: 1,
            rank_rating: 30,
            desired_rank: "Immortal",
            desired_division: 3,
            games: 0,
            duo_game: false,
            chat_offine: false,
            specific_agents: true,
            priority_order: true,
            with_streaming: false,
            price: 71,
            payement: false,
            payement_full_name: "",
            payement_billing_adress: "",
            payement_city: "",
            payement_zipcode: "",
            payement_adress: "",
        },
        {
            status: "Looking for a booster",
            user_id: "60e8742f6ed6d629dc46ce7a",
            booster_id: "",
            chat_id: "",
            account: "wahb",
            password: "testpassword",
            summoner: "WahbGrissa",
            server: "EUW",
            boost_type: "Rank Boosting",
            start_rank: "Silver",
            start_division: 1,
            rank_rating: 30,
            desired_rank: "Diamond",
            desired_division: 1,
            games: 0,
            duo_game: false,
            chat_offine: true,
            specific_agents: true,
            priority_order: true,
            with_streaming: true,
            price: 54,
            payement: false,
            payement_full_name: "",
            payement_billing_adress: "",
            payement_city: "",
            payement_zipcode: "",
            payement_adress: "",
        },
        {
            status: "In progress",
            user_id: "60e8742f6ed6d629dc46ce7b",
            booster_id: "",
            chat_id: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUW",
            boost_type: "Rank Boosting",
            start_rank: "Bronze",
            start_division: 1,
            rank_rating: 30,
            desired_rank: "Silver",
            desired_division: 3,
            games: 0,
            duo_game: false,
            chat_offine: false,
            specific_agents: true,
            priority_order: false,
            with_streaming: false,
            price: 23,
            payement: false,
            payement_full_name: "",
            payement_billing_adress: "",
            payement_city: "",
            payement_zipcode: "",
            payement_adress: "",
        },
        {
            status: "Finished",
            user_id: "60e8742f6ed6d629dc46ce7a",
            booster_id: "60e8742f6ed6d629dc46ce7d",
            chat_id: "",
            account: "maamoun",
            password: "grissa",
            summoner: "MaamounGrissa",
            server: "EUNE",
            boost_type: "Placement Boosting",
            start_rank: "Bronze",
            start_division: 1,
            rank_rating: 60,
            desired_rank: "Immortal",
            desired_division: 3,
            games: 0,
            duo_game: false,
            chat_offine: false,
            specific_agents: true,
            priority_order: false,
            with_streaming: false,
            price: 23,
            payement: true,
            payement_full_name: "Maamoun Grissa",
            payement_billing_adress: "grissa.maamoun@gmail.com",
            payement_city: "Sousse",
            payement_zipcode: "4000",
            payement_adress: "Khezama West",
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