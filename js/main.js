var db = new PouchDB('stable');


new Vue({
    el: '#root',

    data: {
        inputFilter: {
            gender: '',
            generation: '',
            mating_count: '',
        },
        genderClass: {
            male: 'icon blue man',
            female: 'icon red woman',
        },
        filterOption: {
            gender: [{
                name: '全部',
                value: '',
            }, {
                name: '公馬',
                value: 'male',
            }, {
                name: '母馬',
                value: 'female',
            }, ],
            generation: [{
                name: '全部',
                value: '',
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
                value: '',
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
        filterGender: function(gender, userInput) {
            return userInput == '' ? true : gender == userInput
        },
        filterGeneration: function(generation, userInput) {
            return userInput == '' ? true : generation == userInput
        },
        filterMatingCount: function(mating_count, userInput) {
            return userInput === '' ? true :
                userInput === true ? mating_count > 0 : mating_count <= 0
        }
    }
})