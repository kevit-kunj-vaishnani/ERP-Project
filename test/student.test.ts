import request from 'supertest'
import {app} from '../src/index';
import { admin , staff , student } from './db';


describe("add student", ()=>{
    // test(`/students/add`, async  () => {
    //     await request(app).post(`/students/add`).set(`Authorization`, `Bearer ${admin.authToken}`).send(student).expect(200)
    // })

    // test(`/students/add`, async  () => {
    //     await request(app).post(`/students/add`).set(`Authorization`, `Bearer ${staff.authToken}`).send(student).expect(200)
    // })
})


describe("get add student", ()=>{
    // test(`/students`, async () => {
    //     await request(app).get(`/students`).set(`Authorization`, `Bearer ${admin.authToken}`).send().expect(200)  
    // })

    // test(`/students`, async () => {
    //     await request(app).get(`/students`).set(`Authorization`, `Bearer ${staff.authToken}`).send().expect(200)  
    // })

    // test(`/students`, async () => {
    //         await request(app).get(`/students`).set(`Authorization`, `Bearer ${student.authToken}`).send().expect(403)  
    // })
})

describe("get student by id student", ()=>{
    // test(`/students/id`, async () => {
    //     await request(app).get(`/students/654b21b8991c59109981233e`).set(`Authorization`, `Bearer ${admin.authToken}`).send().expect(200) 
    // })

    // test(`/students/id`, async () => {
    //     await request(app).get(`/students/654b21b8991c59109981233e`).set(`Authorization`, `Bearer ${staff.authToken}`).send().expect(200) 
    // })

    // test(`/students/id`, async () => {
    //     await request(app).get(`/students/654b21b8991c59109981233e`).set(`Authorization`, `Bearer ${staff.authToken}`).send().expect(403) 
    // })
})

describe("update student", ()=>{
    // test('/students/update/', async () => {
    //     await request(app).patch(`/students/update/654b21b8991c59109981233e`).set('Authorization', `Bearer ${admin.authToken}`).send({
    //         name:"may"
    //     }).expect(200)   
    // })

    // test('/students/update/', async () => {
    //     await request(app).patch(`/students/update/654b33ee85446eb94371a7f6`).set('Authorization', `Bearer ${staff.authToken}`).send({
    //         name:"may"
    //     }).expect(200)   
    // })

    // test('/students/update/', async () => {
    //     await request(app).patch(`/students/update/654b33ee85446eb94371a7f6`).set('Authorization', `Bearer ${student.authToken}`).send({
    //         name:"may"
    //     }).expect(403)   
    // })
})


describe("delete student", ()=>{
//     test('/students/delete/', async () => {
//         await request(app).delete(`/students/delete/654b21b8991c59109981233e`).set('Authorization', `Bearer ${admin.authToken}`).send().expect(200) 
//     })

//     test('/students/delete/', async () => {
//         await request(app).delete(`/students/delete/654b358c1eda77bc98b0402f`).set('Authorization', `Bearer ${staff.authToken}`).send().expect(200) 
//     })
})

test('', () => {})
