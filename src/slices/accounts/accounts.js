import { createSlice } from '@reduxjs/toolkit';

const accountsData = createSlice({
    name: 'accountsData',
    initialState: {
        "hikutiboo": {
            nickname: "Hikuti Boo",
            profile_picture: "https://www.notigatos.es/wp-content/uploads/2016/03/gatito_sorprendido.jpg.webp",
            password: "12345678_A",
            logged: true,
            bio: "",
            subscriberOf: ["alesto"],
            subscribers: []
        },
        "alesto": {
            nickname: "Alesto",
            profile_picture: "",
            password: "12345678_A",
            logged: true,
            bio: "",
            subscriberOf: [],
            subscribers: ["hikutiboo"]
        }
    },
    reducers: {
        addAccount: (state, action) => {
            let [addUserId, addUserData] = action.payload,
                newUser = Object.assign(
                    {
                        logged: true,
                        bio: "",
                        subscriberOf: 0,
                        subscribers: 0
                    },
                    addUserData
                )

            state[addUserId] = newUser;
        },
        subscribe: (state, action) => {
            let {subscriberOf, subscriber} = action.payload;

            state[subscriberOf]["subscribers"].push(subscriber);
            state[subscriber]["subscriberOf"].push(subscriberOf);
        },
        unsubscribe: (state, action) => {
            let {subscriberOf, subscriber} = action.payload,
                removeSubscriberIndex = state[subscriberOf]["subscribers"].indexOf(subscriber),
                removeSubscribingIndex = state[subscriber]["subscriberOf"].indexOf(subscriberOf);

                state[subscriberOf]["subscribers"].splice(removeSubscriberIndex, 1);
                state[subscriber]["subscriberOf"].splice(removeSubscribingIndex, 1);
        },
        editAccount: (state, action) => {
            let [userId, newData] = action.payload;
            state[userId] = Object.assign(state[userId], newData);
        },
        removeAccount: (state, action) => {
            let removeId = action.payload;

            for (const key in state) {
                if (key === removeId) {
                    delete state[key];
                }
            }
        },
        logIn: (state, action) => {
            let { userId, password } = action.payload;

            if (state[userId]) state[userId]["logged"] = false;

            if (state[userId]?.password === password) {
                state[userId]["logged"] = true;
            }
        },
        logOut: (state, action) => {
            let { userId } = action.payload;

            state[userId].logged = false;
        }
    },
});

export const { addAccount, subscribe, unsubscribe, editAccount, removeAccount, logIn, logOut } = accountsData.actions;
export default accountsData.reducer;