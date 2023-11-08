import request from 'supertest'
import {app} from '../src/index';
import { admin , staff } from './db';

// // beforeEach( async () => {
// //     await Department.deleteMany();

// //     const dept = new Department(department)
// //     await dept.save();
// // })


describe("add department", ()=>{
    // test('/department', async () => {
    //     await request(app).post('/department/add').set('Authorization', `Bearer ${admin.authToken}`).send({  
    //         name: "CV",
    //         initials: "CV",
    //         availableSeats: 5,
    //         batch: 2025,
    //         occupiedSeats: 5
    //     }).expect(200)
    // });

    // test('/department', async () => {
    // await request(app).post('/department/add').set('Authorization', `Bearer ${staff.authToken}`).send({  
    //     name: "CV",
    //     initials: "CV",
    //     availableSeats: 5,
    //     batch: 2025,
    //     occupiedSeats: 5
    // }).expect(403)      // from authorization
    // });
})


describe("get department by id", ()=>{
    // test('/department/id', async () => {
    //     await request(app).get(`/department/654b0c45dd4c99493d7fa5b7`).set('Authorization', `Bearer ${admin.authToken}`).send().expect(200) 
    // })

    // test('/department/id', async () => {
    //     await request(app).get(`/department/654b0c45dd4c99493d7fa5b7`).set('Authorization', `Bearer ${staff.authToken}`).send().expect(403) 
    // })
})


describe("get all", ()=>{
    // test('/department', async () => {
    //     await request(app).get(`/department`).set('Authorization', `Bearer ${admin.authToken}`).send().expect(200)  
    // })

    // test('/department', async () => {
    //     await request(app).get(`/department`).set('Authorization', `Bearer ${staff.authToken}`).send().expect(403)  
    // })
})


describe("update department", ()=>{
    // test('/department/update/', async () => {
    //     await request(app).patch(`/department/update/654a1d005c1e0caf2e3b4dda`).set('Authorization', `Bearer ${admin.authToken}`).send({
    //         batch:2026
    //     }).expect(200)   
    // })

    // test('/department/update/', async () => {
    //     await request(app).patch(`/department/update/654a1d005c1e0caf2e3b4dda`).set('Authorization', `Bearer ${staff.authToken}`).send({
    //         batch:2026
    //     }).expect(403)   
    // })
})


describe("delete department", ()=>{
    // test('/department/delete/', async () => {
    //     await request(app).delete(`/department/delete/654a1d005c1e0caf2e3b4dda`).set('Authorization', `Bearer ${admin.authToken}`).send().expect(200) 
    // })

    // test('/department/delete/', async () => {
    //     await request(app).delete(`/department/delete/654a1d005c1e0caf2e3b4dda`).set('Authorization', `Bearer ${staff.authToken}`).send().expect(403) 
    // })
})

test('', () => {})
