// eslint-disable-next-line import/no-anonymous-default-export
export default {
    sliderContent: [
        {
          title: "Hamado",
          description:
            "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, dapibus ac facilisis.",
          button: "Read More",
          image: "/images/slider/slide1.png",
          user: "Mohamed Abdelaziz",
          userProfile: "/images/ceo.jpg"
        },
        {
          title: "Tortor Commodo",
          description:
            "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac.",
          button: "Discover",
          image: "/images/slider/slide2.png",
          user: "Mohamed Abdelaziz",
          userProfile: "/images/ceo.jpg"
        },
        {
          title: "Phasellus metus",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in.",
          button: "Buy now",
          image: "/images/slider/slide3.png",
          user: "Mohamed Abdelaziz",
          userProfile: "/images/ceo.jpg"
        }
    ],
    categories: [
        {
            _id: '1',
            title: "Table",
            image: "/images/categories/table.png",
            headerImage: "/images/projects/project-2.jpg",
            parentId: 0,
        },
        {
            _id: '2',
            title: "Cabinet",
            image: "/images/categories/cabinet.png",
            headerImage: "/images/projects/project-4.jpg",
            parentId: 0,
        },
        {
            _id: '3',
            title: "Chair",
            image: "/images/categories/chair.png",
            headerImage: "/images/projects/project-1.jpg",
            parentId: 0,
        },
        {
            _id: '4',
            title: "Arm Chair",
            image: "/images/categories/armchair.png",
            headerImage: "/images/projects/project-4.jpg",
            parentId: 0,
        },
        {
            _id: '5',
            title: "Bed",
            image: "/images/categories/bed.png",
            headerImage: "/images/projects/project-1.jpg",
            parentId: 0,
        },
        {
            _id: '6',
            title: "Sofa",
            image: "/images/categories/sofa.png",
            headerImage: "/images/projects/project-2.jpg",
            parentId: 0,
        },
        {
            _id: '7',
            title: "Wardrobe",
            image: "/images/categories/wardrobe.png",
            headerImage: "/images/projects/project-3.jpg",
            parentId: 0,
        },
    ],
    products: [
        {
            _id: '1',
            name: "Laura",
            image: "/images/products/product-1.png",
            price: 200,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['2'],
            rating: 3.5,
            numReviews: 6,
            availability: "In Stock",
            images: ['/images/products/product-1.png', '/images/products/product-2.png', '/images/products/product-3.png']
        },
        {
            _id: '2',
            name: "Divon",
            image: "/images/products/product-2.png",
            price: 170,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['1','3'],
            rating: 4,
            numReviews: 21,
            availability: "By Order",
            images: ['/images/products/product-2.png', '/images/products/product-4.png', '/images/products/product-1.png']
        },
        {
            _id: '3',
            name: "Aurora",
            image: "/images/products/product-3.png",
            price: 450,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['2','5'],
            rating: 5,
            numReviews: 47,
            availability: "By Order 3Days",
            images: ['/images/products/product-3.png', '/images/products/product-4.png', '/images/products/product-5.png']
        },
        {
            _id: '4',
            name: "Seat",
            image: "/images/products/product-4.png",
            price: 120,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['6'],
            rating: 4.3,
            numReviews: 14,
            availability: "In Stock",
            images: ['/images/products/product-4.png', '/images/products/product-2.png', '/images/products/product-1.png']
        },
        {
            _id: '5',
            name: "Seat",
            image: "/images/products/product-4.png",
            price: 120,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['1','6'],
            rating: 2.5,
            numReviews: 2,
            availability: "By Order 1Week",
            images: ['/images/products/product-5.png', '/images/products/product-3.png', '/images/products/product-6.png']
        },
        {
            _id: '6',
            name: "Seat",
            image: "/images/products/product-4.png",
            price: 120,
            description: "Sofa Laura is a casual, contemporary collection that your family is sure to love.",
            categories: ['4'],
            rating: 4.8,
            numReviews: 11,
            availability: "By Order 2Months",
            images: ['/images/products/product-6.png', '/images/products/product-4.png', '/images/products/product-1.png']
        },
    ],
    projects: [
        {
            _id: '1',
            title: "Modern furnishing projects",
            desc: "New furnishing ideas",
            image: "/images/projects/project-1.jpg",
        },
        {
            _id: '2',
            title: "Furnishing and complements",
            desc: "Discover the design table collection",
            image: "/images/projects/project-2.jpg",
        },
        {
            _id: '3',
            title: "Which is Best for Your Home",
            desc: "Wardrobes vs Walk-In Closets",
            image: "/images/projects/project-3.jpg",
        },
        {
            _id: '4',
            title: "Keeping Things Minimal",
            desc: "Creating Your Very Own Bathroom",
            image: "/images/projects/project-4.jpg",
        },
        
    ],
    blog: [
        {
            _id: '1',
            title: "Modern furnishing projects",
            news: "New furnishing ideas",
            image: "/images/projects/project-1.jpg",
            date: "19-06-1988"
        },
        {
            _id: '2',
            title: "Furnishing and complements",
            news: "Discover the design table collection",
            image: "/images/projects/project-2.jpg",
            date: "18-05-1988"
        },
        {
            _id: '3',
            title: "Which is Best for Your Home",
            news: "Wardrobes vs Walk-In Closets",
            image: "/images/projects/project-3.jpg",
            date: "21-05-1993"
        },        
    ],

    instagramImages: [
        {
            _id: '1',
            image: "/images/instagram/square-1.jpg",
        },
        {
            _id: '2',
            image: "/images/instagram/square-2.jpg",
        },
        {
            _id: '3',
            image: "/images/instagram/square-3.jpg",
        },
        {
            _id: '4',
            image: "/images/instagram/square-4.jpg",
        },
        {
            _id: '5',
            image: "/images/instagram/square-5.jpg",
        },
        {
            _id: '6',
            image: "/images/instagram/square-6.jpg",
        },
    ],
}