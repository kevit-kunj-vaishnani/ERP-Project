/* eslint-disable prettier/prettier */
import {
  findDepartmentById,
  findDepartments,
  addDepartment,
  findDepartmentByIdAndUpdate,
  findDepartmentByIdAndDelete,
  deleteAllStudent
} from './department.services';
import {customError} from '../../utils/error';
import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken'; // it is used to sign a JSON Web Token (JWT) using the RSA256 algorithm
import {join} from 'path';
import {logger} from '../../utils/logger';

/**
 * get all departments (Admin can do it.)
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getDepartments = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await findDepartments();
    return res.status(200).send(department);
  } catch (error) {
    next(error);
  }
};

/**
 * create new department (Admin can do it.)
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await addDepartment(req.body);
    return res.status(200).send({success: true, data: department});
  } catch (er) {
    logger.error(`Error in adding Department = ${er}`);
    next(er);
  }
};

/**
 * get 1 department by id (Admin can do it.)
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getDepartmentByID = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const department = await findDepartmentById(req.params.id);
    return res.status(200).send({success: true, data: department || 'no department available'});
  } catch (error) {
    logger.error(`Error in fetching department ${error}`);
    next(error);
  }
};

/**
 * find department by id & update any field (Admin can do it.)
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getDepartmentByIdAndUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const department = await findDepartmentByIdAndUpdate(req.params.id);

    for (const fieldName in req.body) {
      department[fieldName] = req.body[fieldName];
    }

    logger.info(`updated department = ${department}`);

    await department.save();

    return res.status(200).send({success: true, data: department || 'no department available'});
  } catch (error) {
    logger.error(`Error in Updating department ${error}`);
    next(error);
  }
};

/**
 * find department by id & delete (Admin can do it.)
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getDepartmentByIDAndDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const department = await findDepartmentByIdAndDelete(req.params.id);
    logger.info(`${department.name} is now deleted from database`);

    await deleteAllStudent(req.params.id);
    return res.status(200).send({success: true, data: department || 'no department available'});
  } catch (error) {
    logger.error(`Error in deleting department ${error}`);
    next(error);
  }
};
