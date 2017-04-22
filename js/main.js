new Vue({
    el: '#root',

    data: {
        inputFilter: {
            gender: '',
            generation: '',
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
                name: '1',
                value: 1,
            }, {
                name: '2',
                value: 2,
            }, {
                name: '3',
                value: 3,
            }, {
                name: '4',
                value: 4,
            }, {
                name: '5',
                value: 5,
            }, {
                name: '6',
                value: 6,
            }, {
                name: '7',
                value: 7,
            }, ],
        },

        horses: [{
            name: '蕃茄',
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
        }, {
            name: '冰旋風',
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
        }]
    },


    computed: {

        filterHorses: function() {
            return this.horses.filter(horse => {
                return this.filterGender(horse.gender, this.inputFilter.gender) &&
                    this.filterGeneration(horse.generation, this.inputFilter.generation)
            })
        }

    },

    methods: {
        filterGender: function(gender, inputGender) {
            return inputGender == '' ? true : gender == inputGender
        },
        filterGeneration: function(generation, userInput) {
            return userInput == '' ? true : generation == userInput
        }
    }
})