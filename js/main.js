const db = new PouchDB('stable');
const store = {}
var horses = []

store.getHorses = (obj, prop) => {
    db.allDocs({
        include_docs: true,
        attachments: true
    }, function(err, response) {
        if (err) { return console.log(err); }

        response.rows.map(function(value, key) {
            obj[prop].push(value.doc)
        })
    });
}

// store.reloadHorses = (obj, prop) => {
//     store.getHorses().then(horses => {
//         console.log(horses)
//     })
// }


new Vue({
    el: '#root',

    created() {
        store.getHorses(this, 'horses')
    },

    data: {
        test_horses: [],

        inputFilter: {
            gender: 'all',
            generation: 'all',
            mating_count: 'all',
        },
        inputHorse: {
            type: 'horse',

            name: '冰旋風',
            level: 30,
            gender: 'male',
            generation: 5,
            desc: '',
            deadth_count: 1,
            mating_count: 1,

            color_code: {
                red: 0,
                white: 1,
                black: 2,
            },

            city: '海地爾',

            created_at: '2017-03-17',
            updated_at: '2017-03-17'
        },
        genderClass: {
            male: 'fa fa-mars blue',
            female: 'fa fa-venus red',
        },
        filterOption: {
            gender: [{
                name: '全部',
                value: 'all',
            }, {
                name: '公馬',
                value: 'male',
            }, {
                name: '母馬',
                value: 'female',
            }, ],
            generation: [{
                name: '全部',
                value: 'all',
            }, {
                name: '7',
                value: 7,
            }, {
                name: '6',
                value: 6,
            }, {
                name: '5',
                value: 5,
            }, {
                name: '4',
                value: 4,
            }, {
                name: '3',
                value: 3,
            }, {
                name: '2',
                value: 2,
            }, {
                name: '1',
                value: 1,
            }, ],
            mating_count: [{
                name: '全部',
                value: 'all',
            }, {
                name: '可交配',
                value: true,
            }, {
                name: '已無交配次數',
                value: false,
            }],
        },

        horses: [{
            name: '蕃茄',
            level: 30,
            gender: 'female',
            generation: 5,
            desc: '',
            deadth_count: 1,
            mating_count: 1,

            color_code: {
                red: 0,
                white: 1,
                black: 2,
            },

            city: '海地爾',

            created_at: '2017-03-17',
            updated_at: '2017-03-17'
        }, {
            name: '公馬',
            level: 30,
            gender: 'male',
            generation: 5,
            desc: '',
            deadth_count: 1,
            mating_count: 0,

            color_code: {
                red: 0,
                white: 1,
                black: 2,
            },

            city: '海地爾',

            created_at: '2017-03-17',
            updated_at: '2017-03-17'
        }]
    },


    computed: {

        filterHorses: function() {
            return this.horses.filter(horse => {
                return this.filterGender(horse.gender, this.inputFilter.gender) &&
                    this.filterGeneration(horse.generation, this.inputFilter.generation) &&
                    this.filterMatingCount(horse.mating_count, this.inputFilter.mating_count)
            })
        },

    },

    methods: {
        filterGender(gender, userInput) {
            return userInput == 'all' ? true : gender == userInput
        },
        filterGeneration(generation, userInput) {
            return userInput == 'all' ? true : generation == userInput
        },
        filterMatingCount(mating_count, userInput) {
            return userInput === 'all' ? true :
                userInput === true ? !!mating_count : !mating_count
        },

        // db
        createHorse() {
            horse = this.inputHorse
            console.log(horse)
            db.post(horse, function callback(err, result) {
                if (!err) {
                    console.log('Successfully posted a horse!');
                }
            });
        },

    }
})