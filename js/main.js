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
            <div class="modal-background" @click="$emit('close')"></div>

            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">新增馬匹</p>
                    <button class="delete" @click="$emit('close')"></button>
                </header>
                
                <section class="modal-card-body">
                
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">名稱</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input v-model="inputHorse.name" class="input" :class="{'is-danger': !inputHorse.name}" type="text" placeholder="馬匹名稱">
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.name">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">世代</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="slider">
                                        <input v-model="inputHorse.generation" type="range" min="0" max="9"/>
                                        <output>{{inputHorse.generation}}</output>
                                    </div>
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.generation">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">種類</label>
                        </div>
                        <div class="field-body">
                            <div class="field is-narrow">
                                <div class="control" v-for="tier in tiers">
                                    <label class="radio">
                                        <input v-model="inputHorse.tier" type="radio" :value="tier"/> 
                                        <img :src=" 'imgs/horses/' + tier + '.png' ">
                                    </label>
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.tier">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">等級</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="slider">
                                        <input v-model="inputHorse.level" type="range" min="1" max="30"/>
                                        <output>{{inputHorse.level}}</output>
                                    </div>
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.level">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">性別</label>
                        </div>
                        <div class="field-body">
                            <div class="field is-narrow">
                                <div class="control">
                                    <label class="radio">
                                        <input v-model="inputHorse.gender" type="radio" value="male"/> 公馬
                                    </label>
                                    <label class="radio">
                                        <input v-model="inputHorse.gender" type="radio" value="female"/> 母馬
                                    </label>
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.gender">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">交配次數</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="slider">
                                        <input v-model="inputHorse.matingCount" type="range" min="0" max="2"/>
                                        <output>{{inputHorse.matingCount}}</output>
                                    </div>
                                </div>
                                <p class="help is-danger" v-if="!inputHorse.matingCount">
                                    This field is required
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </section>
                <footer class="modal-card-foot">
                    <a class="button is-success" @click="this.addHorse">Create</a>
                    <a class="button" @click="$emit('close')">Cancel</a>
                </footer>
            </div>
        </div>
    `,
    data() {
        return {
            inputHorse: {
                generation: 6,
                tier: 't6c',
                color: {
                    red: 0,
                    white: 1,
                    black: 2,
                },

                name: '',
                level: 1,
                gender: 'male',
                desc: '',
                deadthCount: 1,
                matingCount: 1,
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
    firebase() {
        return {
            horses: db.ref('app/horses')
        }
    },
    computed: {
        tiers() {
            var self = this;
            var tiers = this.horses.map(function(horse) { return horse.tier; });
            console.log(tiers)
            return tiers.filter((tier) => {
                return tier.match(self.inputHorse.generation);
            })
        }
    },

    methods: {
        findTier(element) {
            return element.tier == this.inputHorse.tier;
        },
        setInputHorseColor(color) {
            this.inputHorse.color.red = color.red
            this.inputHorse.color.white = color.white
            this.inputHorse.color.black = color.black
        },
        setInputHorseStats(stats) {
            this.inputHorse.stats.speed = stats.speed
            this.inputHorse.stats.acceleration = stats.acceleration
            this.inputHorse.stats.agility = stats.agility
            this.inputHorse.stats.breaking = stats.breaking
        },
        addHorse() {
            var horse = this.horses.find(this.findTier)
            this.setInputHorseColor(horse.color)
            this.setInputHorseStats(horse.stats)

            vm.$firebaseRefs.horses.push(this.inputHorse)
            this.$emit('close');
        },
    },
})

var vm = new Vue({
    el: '#root',

    beforeCreate() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$bindAsArray('horses', db.ref('users/' + user.uid + '/horses'))
                console.log("User is logined", user.uid)
            } else {
                vue.showLoginModal = true;
                console.log("User is not logined yet.");
            }
        }).bind(this)

    },

    data: {


        showCreateHorseModal: false,
        showLoginModal: false,

        inputFilter: {
            gender: 'all',
            generation: 'all',
            matingCount: 'all',
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
            matingCount: [{
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
                    this.filterMatingCount(horse.matingCount, this.inputFilter.matingCount)
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
                userInput === true ? mating_count > 0 : mating_count <= 0
        },
    }
})