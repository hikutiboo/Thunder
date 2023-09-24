export const newPostValidation = {
    "description": {
        minLength: [10, "Too short! Minimum length is 10!"],
        maxLength: [5000, "Too long! Maximum length is 5000!"]
    },
    "profile_picture": {
        reqired: [true, "This field is reqiured!"],
        fileTypes: [["jpeg", "png", "svg", "webp"], "Unsuported file extension!"]
    }
}