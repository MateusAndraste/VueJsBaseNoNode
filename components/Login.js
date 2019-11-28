import RestManager from "../utils/RestManager.js";

const authView = `
    <div>
        </br>

        <div class="text-center">
                        <v-snackbar v-model="snackbar" :timeout="timeout" :top="top" :color="feedbackColor">
                            {{ feedbackMessage }}
                            <v-btn color="white" text @click="snackbar = false">
                                <v-icon small class="mr-2">
                                    <!-- Inclusão -->
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </v-snackbar>
                    </div>

        <!-- ÁREA DE LOGIN -->
    
        <v-row justify="center">
            <v-col cols="8" sm="8" md="8" lg="4">
                <v-card :loading="progressbarActive">
                    <v-card-title class="headline">ENTRAR</v-card-title>
                    <v-card-text>

                        <v-form
                            ref="form" 
                            v-model="valid"
                            lazy-validation
                        >
                            <v-text-field ref="loginAd" v-model="loginAd"
                                :rules="loginAdRules" label="Usuário"
                                required></v-text-field>
                            <v-text-field ref="password" v-model="password"
                                :type="showPass ? 'text' : 'password'"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPass = !showPass"
                                :rules="passwordRules" label="Senha"
                                @keyup.enter="login"
                                required></v-text-field>
                        </v-form>

                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="login">
                            Entrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
`;


const AuthView = {
    template: authView,
    data() {
        return {
            valid: true,
            progressbarActive: false,
            showPass: false,
            loginAd: '',
            loginAdRules: [
                () => !!this.loginAd || 'O campo Usuário não pode ser vazio'
            ],
            password: '',
            passwordRules: [
                () => !!this.password || 'O campo Senha não pode ser vazio'
            ],

            feedbackMessage: "",
            feedbackColor: '',
            snackbar: false,
            timeout: 10000,
            top: true

        }
    },

    mounted() {
        if (this.$session.exists()) {
            this.$router.replace({ name: "TableView" });
        }
    },

    methods: {
        login() {
            if (this.$refs.form.validate()) {
                this.progressbarActive = !this.progressbarActive;
                RestManager.makeLogin(this.loginAd, this.password, this.callBack, this.errCallback);
            }
        },

        callBack(resp) {
            let respData = resp.data;

            if (respData.success) {
                this.$session.start();
                this.$session.set('user', respData.data);
                this.$router.replace({ name: "TableView" });
                this.progressbarActive = !this.progressbarActive;
            } else {
                this.progressbarActive = !this.progressbarActive;
                this.feedbackColor = 'error';
                this.feedbackMessage = respData.message;
                this.snackbar = true;
            }
        },

        errCallback(err) {
            console.log("Erro na requisição");
            console.log(err);
        }
    }
}

export default AuthView;

