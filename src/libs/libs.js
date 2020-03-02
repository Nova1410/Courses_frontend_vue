import router from '../router'

// Helper methods
const libs = {
    // Verify if the user is authenticated
    isAuthenticated() {
        return localStorage.getItem('token') !== null || false
    },
    // Log out the user
    logOut() {
        localStorage.clear()
        router.push('/')
    }
}

export default libs