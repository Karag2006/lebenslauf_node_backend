const mongoose = require('mongoose')

const lebenslaufShema = new mongoose.Schema({
    intro: {
        title: String,
        items: [
            {
                id: Number,
                title: String,
                content: String,
            },
        ],
        image: {
            src: String,
            alt: String,
        },
    },
    main: {
        skills: {
            skillTitle: String,
            skillCategories: [
                {
                    id: Number,
                    col: Number,
                    title: String,
                    items: [
                        {
                            id: Number,
                            name: String,
                            level: Number,
                        },
                    ],
                },
            ],
        },
        career: {
            jobs: {
                title: String,
                jobItems: [
                    {
                        id: Number,
                        institution: String,
                        timeFrame: String,
                        occupation: String,
                        work: [
                            {
                                id: Number,
                                text: String,
                            },
                        ],
                    },
                ],
            },
            studies: {
                title: String,
                studiesItems: [
                    {
                        id: Number,
                        institution: String,
                        timeFrame: String,
                        subjects: [
                            {
                                id: Number,
                                text: String,
                            },
                        ],
                    },
                ],
            },
            school: {
                title: String,
                schoolItems: [
                    {
                        id: Number,
                        institution: String,
                        timeFrame: String,
                        class: String
                    },
                ],
            },
        },
    },
});


module.exports = mongoose.model('full', lebenslaufShema)