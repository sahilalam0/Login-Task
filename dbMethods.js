const fs = require('fs');

const DB_URL = './db.json';

const initializeConnection = () => {
    return new Promise((resolve, reject) => {
        fs.access(DB_URL, (err) => {
            if (err) {

                console.log("DB does not exists, trying to create a new DB!!");
                fs.writeFile(DB_URL, JSON.stringify([]), (err) => {
                    if (err) {
                        reject({
                            message: "Error Creating DB!"
                        });
                    }
                    resolve("DB Created and is ready to use!!");
                })
            }
            else {
                resolve("DB is ready to use!");
            }
        });
    });
};

const findAll = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(DB_URL, (err, data) => {
            if (err) {
                reject({
                    message: "Error reading DB!"
                });
            }

            const users = JSON.parse(data.toString());
            resolve(users);
        });
    })
}

const find = (query) => {
    return new Promise((resolve, reject) => {

        findAll()
            .then((users) => {
                if (typeof query === 'object') {

                    const keys = Object.keys(query);
                    const user = users.find((user) => {
                        for (const ind in keys) {
                            if (user[keys[ind]] != query[keys[ind]]) {
                                return false;
                            }
                        }
                        return true;
                    });
                    resolve(user);
                }
                else {
                    resolve(users);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
};

const createUser = (email) => {
    return new Promise((resolve, reject) => {
        fs.readFile(DB_URL, (err, data) => {
            if (err) {
                reject({
                    message: "Error reading DB!"
                });
            }
            const newUser = {
                email,
                "userId": (new Date()) - 0,
                "password": (new Date()) - 0
            };
            const users = JSON.parse(data.toString());
            users.push(newUser);
            fs.writeFile(DB_URL, JSON.stringify(users), (err) => {
                if (err) {
                    reject({
                        message: "Error creating new user"
                    });
                }
                resolve(newUser);
            })
        })
    })
};

const updatePasswordByUserId = (userId, newPassword) => {

    return new Promise((resolve, reject) => {
        findAll()
            .then((users) => {
                let newDetails = null;

                const updatedUsers = users.map((user) => {
                    if (user.userId == userId) {
                        return newDetails = { ...user, password: newPassword };
                    }
                    return user;
                })
                if (newDetails) {
                    fs.writeFile(DB_URL, JSON.stringify(updatedUsers), (err) => {
                        if (err) {
                            reject({
                                message: "Error updating DB !"
                            })
                        }
                        resolve(newDetails);
                    });
                }
                else {
                    resolve({
                        message: "No user found with given id!"
                    })
                }

            })
            .catch((err) => {
                reject(err);
            });
    });
};

const deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        findAll()
            .then((users) => {
                let userFound = false;
                const updatedUsers = users.filter((user) => {
                    if (user.userId == userId) {
                        userFound = true;
                        return false;
                    }
                    return true;
                })
                if (userFound) {
                    fs.writeFile(DB_URL, JSON.stringify(updatedUsers), (err) => {
                        if (err) {
                            reject({
                                message: "Error updating DB !"
                            })
                        }
                        resolve({
                            message: "User Deleted !"
                        });
                    })
                }
                else {
                    resolve({
                        message: "No user found with given id!"
                    })
                }

            })
            .catch((err) => {
                reject(err);
            });
    });
}

const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await find({
                email,
                password
            });
            resolve(user);
        }
        catch (err) {
            reject(err);
        }
    })
}


module.exports = {
    initializeConnection,
    find,
    createUser,
    updatePasswordByUserId,
    deleteUserById,
    login
}

