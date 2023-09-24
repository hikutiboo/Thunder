export const loginValidation = {
    "userId": {
        reqired: [true, "This field is reqired!"],
        minLength: [3, "Too short! Minimum length is 3!"],
        maxLength: [20, "Too long! Maximum length is 20!"],
        containmentRules: [/^[^\s]*$/, "User ID shouldn't contain any spaces!"]
    },
    "password": {
        reqired: [true, "This field is reqiured!"],
        minLength: [8, "Too short! Minimum length is 8!"]
    }
}