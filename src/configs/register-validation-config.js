export const registerValidation = {
    "userId": {
        reqired: [true, "This field is reqired!"],
        minLength: [3, "Too short! Minimum length is 3!"],
        maxLength: [20, "Too long! Maximum length is 20!"],
        containmentRules: [/^[^\s]*$/, "User ID shouldn't contain any spaces!"]
    },
    "nickname": {
        minLength: [3, "Too short! Minimum length is 3!"],
        maxLength: [30, "Too long! Maximum length is 30!"]
    },
    "password": {
        reqired: [true, "This field is reqiured!"],
        minLength: [8, "Too short! Minimum length is 8!"],
        containmentRules: [
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=\\/]).+$/,
            // eslint-disable-next-line no-useless-escape
            "Your password should contain at least one letter, number and special symbol (!, @, #, $, %, ^, &, *, (, ), -, _, =, \, /)!"
        ]
    },
    "profile_picture": {
        reqired: [true, "This field is reqiured!"],
        fileTypes: [["jpeg", "png", "svg", "webp"], "Unsuported file extension!"]
    }
}