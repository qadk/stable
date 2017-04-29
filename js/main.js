// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQps0i4ag5joZal67bSertXiI9yVyepSk",
    authDomain: "stable-132f4.firebaseapp.com",
    databaseURL: "https://stable-132f4.firebaseio.com",
    projectId: "stable-132f4",
    storageBucket: "stable-132f4.appspot.com",
    messagingSenderId: "150021425917"
};
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database()


const store = {}
var horses = []

Vue.component('login-modal', {
    template: `<div class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <div class="content">


                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">信箱</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <input v-model="user.email" class="input" :class="{'is-danger': !user.email}" type="text" placeholder="信箱">
                                            </div>
                                            <p class="help is-danger" v-if="!user.email">
                                                This field is required
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">密碼</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <input v-model="user.password" class="input" :class="{'is-danger': !user.password}" type="password" placeholder="密碼(六個字元以上)">
                                            </div>
                                            <p class="help is-danger" v-if="!user.password">
                                                This field is required
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-primary" @click="this.signIn">Submit</button>
                                    </p>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>`,
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        signIn() {
            var email = this.user.email
            var password = this.user.password

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            })
        },
    }


})

Vue.component('create-horse-modal', {
    template: `
    <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                            
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">名稱</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <input v-model="horse.name" class="input" :class="{'is-danger': !horse.name}" type="text" placeholder="馬匹名稱">
                                            </div>
                                            <p class="help is-danger" v-if="!horse.name">
                                                This field is required
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-primary" @click="this.addHorse">Submit</button>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <button class="modal-close" @click="$emit('close')"></button>
        </div>
    `,
    data() {
        return {
            horse: {
                generation: 6,
                tair: 't6c',
                color_code: {
                    red: 0,
                    white: 1,
                    black: 2,
                },

                name: '冰旋風',
                level: 30,
                gender: 'male',
                desc: '',
                deadth_count: 1,
                mating_count: 1,
                stats: {
                    speed: "113.50",
                    acceleration: "113.50",
                    agility: "110.50",
                    breaking: "110.50"
                },
                city: '海地爾',

                created_at: '2017-03-17',
                updated_at: '2017-03-17'
            },
        }
    },
    methods: {
        addHorse() {
            vm.$firebaseRefs.horses.push(this.horse)
            this.$emit('close');
        },
    }
})

var vm = new Vue({
    el: '#root',

    beforeCreate() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user
                this.$bindAsArray('horses', db.ref('users/' + user.uid + '/horses'))
                console.log("User is logined", user.uid)
            } else {
                vue.showLoginModal = true;
                console.log("User is not logined yet.");
            }

            console.log(123, this.user.uid)

        }).bind(this)
    },

    data: {
        showCreateHorseModal: false,
        showLoginModal: false,

        user: {},

        inputFilter: {
            gender: 'all',
            generation: 'all',
            mating_count: 'all',
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

        horses: [],
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
    }
})