import request from 'supertest'
import {app} from '../src/index';
import { admin, staff } from './db'

describe("add department", ()=>{
    // test(`/users`, async () => {
    //     await request(app).post(`/users/add`).set(`Authorization`, `Bearer ${admin.authToken}`).send(staff).expect(200)
    // });

    // test(`/users`, async () => {
    //     await request(app).post(`/users/add`).set(`Authorization`, `Bearer ${staff.authToken}`).send(staff).expect(403)
    // });
})

describe("get all users", ()=>{
    // test(`/users`, async () => {
    //     await request(app).get(`/users`).set(`Authorization`, `Bearer ${admin.authToken}`).send().expect(200)  
    // })

    // test(`/users`, async () => {
    //     await request(app).get(`/users`).set(`Authorization`, `Bearer ${staff.authToken}`).send().expect(200)  
    // })
})

describe("get by id ", ()=>{
    // test(`/users/id`, async () => {
    //     await request(app).get(`/users/654b11566a8a0eaa2755270f`).set(`Authorization`, `Bearer ${admin.authToken}`).send().expect(200) 
    // })

    // test(`/users/id`, async () => {
    //     await request(app).get(`/users/654b11566a8a0eaa2755270f`).set(`Authorization`, `Bearer ${staff.authToken}`).send().expect(200) 
    // })
})

describe(" update users  ", ()=>{
    // test('/users/update/', async () => {
    //     await request(app).patch(`/users/update/654b11566a8a0eaa2755270f`).set('Authorization', `Bearer ${admin.authToken}`).send({
    //         name:"b"
    //     }).expect(200)   
    // })

    // test('/users/update/', async () => {
    //     await request(app).patch(`/users/update/654b11566a8a0eaa2755270f`).set('Authorization', `Bearer ${staff.authToken}`).send({
    //         name:"b"
    //     }).expect(403)   
    // })
})

describe(" delete users  ", ()=>{
    // test('/users/delete/', async () => {
    //     await request(app).delete(`/users/delete/654b1d7a514a75b7102b7241`).set('Authorization', `Bearer ${admin.authToken}`).send().expect(200) 
    // })

    // test('/users/delete/', async () => {
    //     await request(app).delete(`/users/delete/654b1d7a514a75b7102b7241`).set('Authorization', `Bearer ${staff.authToken}`).send().expect(403) 
    // })
})

describe("staff update his password field" , () => {
    // test('/update/myself', async () => {
    //     await request(app).patch("/users/update/myself").set('Authorization', `Bearer ${staff.authToken}`).send({password: "kuna"}).expect(200)
    // }) // staff update his password

    // test('/update/myself', async () => {
    //     await request(app).patch("/users/update/myself").set('Authorization', `Bearer ${staff.authToken}`).send({name:`abc`}).expect(400)
    // }) // admin updates other field

    // test('/update/myself', async () => {
    //     await request(app).patch("/users/update/myself").set('Authorization', `Bearer ${admin.authToken}`).send({password: "nee"}).expect(200)
    // }) // admin update his password
})

test('', () => {})
