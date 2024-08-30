const mongoose = require('mongoose');
const Course = require('../models/course');
const Student = require('../models/student');

const mongoUri = 'mongodb+srv://arhayat7:UDNhuMzrHvsr3IeV@cluster0.jpujb.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri);

const image = "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg"

const coursesData = [
    {
      "id": 1,
      "name": "Introduction to React Native",
      "instructor": "John Doe",
      "description": "Learn the basics of React Native development and build your first mobile app.",
      "enrollmentStatus": "Open",
      "thumbnail": image,
      "duration": "8 weeks",
      "schedule": "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
      "location": "Online",
      "prerequisites": ["Basic JavaScript knowledge", "Familiarity with React"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to React Native", "content": "Overview of React Native, setting up your development environment." },
        { "week": 2, "topic": "Building Your First App", "content": "Creating a simple mobile app using React Native components." }
      ],
      "students": []
    },
    {
      "id": 2,
      "name": "Advanced Python Programming",
      "instructor": "Jane Smith",
      "description": "Master advanced Python concepts and techniques.",
      "enrollmentStatus": "In Progress",
      "thumbnail": image,
      "duration": "10 weeks",
      "schedule": "Mondays, 4:00 PM - 6:00 PM",
      "location": "Online",
      "prerequisites": ["Intermediate Python knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Decorators and Generators", "content": "Learn about decorators and generators in Python." },
        { "week": 2, "topic": "Context Managers", "content": "Understanding and implementing context managers." }
      ],
      "students": []
    },
    {
      "id": 3,
      "name": "Data Structures and Algorithms",
      "instructor": "Alice Brown",
      "description": "Learn essential data structures and algorithms for coding interviews.",
      "enrollmentStatus": "Closed",
      "thumbnail": image,
      "duration": "12 weeks",
      "schedule": "Wednesdays, 5:00 PM - 7:00 PM",
      "location": "Online",
      "prerequisites": ["Basic programming knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Arrays and Linked Lists", "content": "Introduction to arrays and linked lists." },
        { "week": 2, "topic": "Stacks and Queues", "content": "Learn about stacks and queues." }
      ],
      "students": []
    },
    {
      "id": 4,
      "name": "Machine Learning Basics",
      "instructor": "Michael Johnson",
      "description": "An introductory course to Machine Learning.",
      "enrollmentStatus": "Open",
      "thumbnail": image,
      "duration": "8 weeks",
      "schedule": "Fridays, 3:00 PM - 5:00 PM",
      "location": "Online",
      "prerequisites": ["Basic Python knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Machine Learning", "content": "Overview of Machine Learning concepts." },
        { "week": 2, "topic": "Supervised Learning", "content": "Introduction to supervised learning techniques." }
      ],
      "students": []
    },
    {
      "id": 5,
      "name": "Full Stack Web Development",
      "instructor": "Emily White",
      "description": "Become a full-stack web developer by learning both front-end and back-end technologies.",
      "enrollmentStatus": "In Progress",
      "thumbnail": image,
      "duration": "16 weeks",
      "schedule": "Saturdays, 10:00 AM - 2:00 PM",
      "location": "Online",
      "prerequisites": ["Basic HTML/CSS knowledge"],
      "syllabus": [
        { "week": 1, "topic": "HTML and CSS", "content": "Introduction to HTML and CSS." },
        { "week": 2, "topic": "JavaScript Basics", "content": "Learn the basics of JavaScript." }
      ],
      "students": []
    },
    {
      "id": 6,
      "name": "Cloud Computing Essentials",
      "instructor": "Robert Green",
      "description": "Learn the basics of cloud computing and popular cloud platforms.",
      "enrollmentStatus": "Open",
      "thumbnail": image,
      "duration": "10 weeks",
      "schedule": "Tuesdays, 7:00 PM - 9:00 PM",
      "location": "Online",
      "prerequisites": ["Basic IT knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Cloud Computing", "content": "Overview of cloud computing concepts." },
        { "week": 2, "topic": "AWS Basics", "content": "Introduction to AWS services." }
      ],
      "students": []
    },
    {
      "id": 7,
      "name": "Cybersecurity Fundamentals",
      "instructor": "Laura Davis",
      "description": "An introduction to cybersecurity principles and practices.",
      "enrollmentStatus": "Closed",
      "thumbnail": image,
      "duration": "8 weeks",
      "schedule": "Thursdays, 6:00 PM - 8:00 PM",
      "location": "Online",
      "prerequisites": ["Basic networking knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Cybersecurity", "content": "Overview of cybersecurity threats and practices." },
        { "week": 2, "topic": "Network Security", "content": "Learn about network security measures." }
      ],
      "students": []
    },
    {
      "id": 8,
      "name": "Introduction to Blockchain",
      "instructor": "James Wilson",
      "description": "Learn the basics of blockchain technology and its applications.",
      "enrollmentStatus": "Open",
      "thumbnail": image,
      "duration": "6 weeks",
      "schedule": "Mondays and Wednesdays, 4:00 PM - 6:00 PM",
      "location": "Online",
      "prerequisites": ["Basic IT knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Blockchain", "content": "Overview of blockchain technology." },
        { "week": 2, "topic": "Cryptography Basics", "content": "Introduction to cryptography and its role in blockchain." }
      ],
      "students": []
    },
    {
      "id": 9,
      "name": "Digital Marketing Strategies",
      "instructor": "Olivia Brown",
      "description": "Learn effective digital marketing strategies to grow your business online.",
      "enrollmentStatus": "Open",
      "thumbnail": image,
      "duration": "8 weeks",
      "schedule": "Wednesdays, 6:00 PM - 8:00 PM",
      "location": "Online",
      "prerequisites": ["Basic marketing knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Digital Marketing", "content": "Overview of digital marketing strategies." },
        { "week": 2, "topic": "SEO Fundamentals", "content": "Learn the basics of Search Engine Optimization." }
      ],
      "students": []
    },
    {
      "id": 10,
      "name": "Game Development with Unity",
      "instructor": "Christopher Taylor",
      "description": "Learn how to develop 2D and 3D games using Unity.",
      "enrollmentStatus": "In Progress",
      "thumbnail": image,
      "duration": "12 weeks",
      "schedule": "Fridays, 4:00 PM - 7:00 PM",
      "location": "Online",
      "prerequisites": ["Basic programming knowledge"],
      "syllabus": [
        { "week": 1, "topic": "Introduction to Unity", "content": "Overview of Unity and setting up your first project." },
        { "week": 2, "topic": "Basic Game Mechanics", "content": "Learn to implement basic game mechanics in Unity." }
      ],
      "students": []
    }
  ]
  

const studentsData = [
    {
      "id": 101,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "courses": []
    },
    {
      "id": 102,
      "name": "Bob Smith",
      "email": "bob@example.com",
      "courses": []
    },
    {
      "id": 103,
      "name": "Charlie Davis",
      "email": "charlie@example.com",
      "courses": []
    },
    {
      "id": 104,
      "name": "Diana Harris",
      "email": "diana@example.com",
      "courses": []
    },
    {
      "id": 105,
      "name": "Eve Brown",
      "email": "eve@example.com",
      "courses": []
    },
    {
      "id": 106,
      "name": "Frank White",
      "email": "frank@example.com",
      "courses": []
    },
    {
      "id": 107,
      "name": "Grace Wilson",
      "email": "grace@example.com",
      "courses": []
    },
    {
      "id": 108,
      "name": "Henry Green",
      "email": "henry@example.com",
      "courses": []
    },
    {
      "id": 109,
      "name": "Ivy Martinez",
      "email": "ivy@example.com",
      "courses": []
    },
    {
      "id": 110,
      "name": "Jack Taylor",
      "email": "jack@example.com",
      "courses": []
    }
  ]
  

const seedDB = async () => {
  try {
    await Course.deleteMany({});
    await Student.deleteMany({});

    await Course.insertMany(coursesData);
    await Student.insertMany(studentsData);

    console.log('Database seeded!');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
