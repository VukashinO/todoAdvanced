interface todoItem {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

interface profile {
    age: number,
    weight: number,
    height: number,
    activity: number,
    gender: number
}

interface authorization {
    id: string,
    token: string,
    email : string,
    isAdmin: boolean
}

interface logInModel {
    email: string,
    password: string
}