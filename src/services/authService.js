import User from "../models/User.js"

export default {
    register(userData) {
        User.create(userData)
    }
}