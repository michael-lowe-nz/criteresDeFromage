export default [
    {
        text: 'What cheese is it?',
        weight: 0.9,
        answers: [
            {label: 'Parmesan',  value: -1},
            {label: 'Blue Cheese',  value: -1},
            {label: 'Mozarella',  value: 0.9},
            {label: 'Other',  value: 0.5},
        ]
    },
    {
        text: 'What temperature is it?',
        weight: 0.7,
        answers: [
            {label: 'Hot',  value: 0.9},
            {label: 'Warm',  value: -1},
            {label: 'Cold',  value: 0.9},
        ]
    },
    {
        text: 'What situation is it in?',
        weight: 0.6,
        answers: [
            {label: 'On a pizza',  value: 0.9},
            {label: 'In a burger',  value: -1},
            {label: 'In a toasted sandwich',  value: 0.9},
            {label: 'On top of something',  value: 0.9},
            {label: 'With a cracker',  value: 0.9},
        ]
    },
    {
        text: 'How was it cooked?',
        weight: 0.6,
        answers: [
            {label: 'In an enclosed situation',  value: 0.9},
            {label: 'In an open top grill like situation',  value: 0.9},
        ]
    }
]