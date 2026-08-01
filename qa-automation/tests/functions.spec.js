// @ts-check
import { test, expect } from '@playwright/test';

test('JS Advanced - Functions', async () => {
    const user = {
        username: 'john',
        role: 'admin',
        isActive: true,
        "full name": 'John Doe',
        address: {
            city: 'Kyiv',
            zip: '00001'
        },
        roles: ['admin', 'editor']
    }
    // console.log(user.username)
    // console.log(user['username'])
    // console.log(user['full name'])
    // console.log(user.address.city)
    // console.log(user.roles[1])
    const jsonString = JSON.stringify(user)
    console.log(jsonString)
    const userNew = JSON.parse(jsonString)
    console.log(userNew)
});