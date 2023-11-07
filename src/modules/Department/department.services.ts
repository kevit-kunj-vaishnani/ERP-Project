/* eslint-disable prettier/prettier */
import {Department} from './department.model';
import {IDepartment} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {Student} from '../Student/student.model';
import {Attendance} from '..//Attendance/attendance.model';

// find all department
export const findDepartments = async (): Promise<IDepartment[]> => {
  try {
    return await Department.find();
  } catch (error) {
    throw customError(500, error);
  }
};

// find 1 department by id
export const findDepartmentById = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findById({_id: _id});
  } catch (error) {
    throw customError(500, error);
  }
};

// add department
export const addDepartment = async (department): Promise<object> => {
  try {
    return await Department.create(department);
  } catch (error) {
    throw customError(500, error);
  }
};

// delete department
export const findDepartmentByIdAndDelete = async (_id): Promise<IDepartment> => {
  try {
    const department = await Department.findById(_id);
    const student = await Student.find({departmentId: department._id});
    const allStudentsIds = student.map((i) => {
      return i._id;
    });

    await Department.findByIdAndDelete(_id);
    await Student.deleteMany({departmentId: _id});
    await Attendance.deleteMany({studentId: {$in: allStudentsIds}});

    return department;
  } catch (error) {
    throw customError(500, error);
  }
};

// update department
export const findDepartmentByIdAndUpdate = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findByIdAndUpdate(_id);
  } catch (error) {
    throw customError(500, error);
  }
};

export const aggregation1 = async () => {
  try {
    const pipeline: any = [
      {
        $group: {
          _id: '$batch',
          totalStudents: {
            $sum: '$occupiedSeats'
          },
          branches: {
            $push: {
              initials: '$initials',
              occupiedSeats: '$occupiedSeats'
            }
          }
        }
      },
      {
        $project: {
          dept: {
            $map: {
              input: '$branches',
              as: 'data',
              in: {
                k: '$$data.initials',
                v: '$$data.occupiedSeats'
              }
            }
          },
          totalStudents: 1
        }
      },
      {
        $project: {
          year: '$_id',
          branches: {
            $arrayToObject: '$dept'
          },
          totalStudents: 1
        }
      },
      {
        $sort: {
          totalStudents: -1
        }
      }
    ];

    // Execute the aggregation pipeline
    return await Department.aggregate(pipeline);
  } catch (error) {
    throw customError(500, 'Error aggregating departments: ' + error.message);
  }
};

export const aggregation2 = async (obj) => {
  try {
    const pipeline: any = [
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'departmentId',
          as: 'result1'
        }
      },
      {
        $unwind: {
          path: '$result1'
        }
      },
      {
        $project: {
          departmentName: '$name',
          initials: 1,
          batch: 1,
          sid: '$result1._id',
          sName: '$result1.name',
          Sem: '$result1.sem'
        }
      },
      {
        $lookup: {
          from: 'attendances',
          localField: 'sid',
          foreignField: 'studentId',
          as: 'result2'
        }
      },
      {
        $unwind: {
          path: '$result2'
        }
      },
      {
        $project: {
          _id: 0,
          did: '$_id',
          departmentName: '$departmentName',
          initials: 1,
          batch: 1,
          sid: '$sid',
          sName: '$sName',
          Sem: '$Sem',
          date: '$result2.date',
          isPresent: '$result2.isPresent'
        }
      },
      {
        $match: {
          date: new Date(obj.date),
          isPresent: false
        }
      }
    ];

    if (obj.batch) {
      pipeline.push({
        $match: {
          batch: obj.batch
        }
      });
    }

    if (obj.Sem) {
      pipeline.push({
        $match: {
          Sem: obj.Sem
        }
      });
    }

    if (obj.departmentName) {
      pipeline.push({
        $match: {
          departmentName: obj.departmentName
        }
      });
    }

    return await Department.aggregate(pipeline);
  } catch (err) {
    throw customError(500, 'Error in 2nd');
  }
};

export const aggregation3 = (obj) => {
  try {
    const pipeline: any = [
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'departmentId',
          as: 'r1'
        }
      },
      {
        $unwind: {
          path: '$r1'
        }
      },
      {
        $project: {
          _id: 0,
          did: '$_id',
          sName: '$r1.name',
          dname: '$name',
          batch: 1,
          sem: '$r1.sem',
          sid: '$r1._id'
        }
      },
      {
        $lookup: {
          from: 'attendances',
          localField: 'sid',
          foreignField: 'studentId',
          as: 'r2'
        }
      },
      {
        $unwind: {
          path: '$r2'
        }
      },
      {
        $project: {
          batch: 1,
          did: 1,
          sName: 1,
          dname: 1,
          sem: 1,
          date: '$r2.date',
          isPresent: '$r2.isPresent'
        }
      },
      {
        $match: {
          date: {
            $lte: new Date(obj.date)
          }
        }
      },
      {
        $group: {
          _id: '$sName',
          total: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $addFields: {
          totaldays: {
            $size: '$total'
          }
        }
      },
      {
        $unwind: {
          path: '$total'
        }
      },
      {
        $project: {
          sName: '$total.sName',
          dname: '$total.dname',
          batch: '$total.batch',
          sem: '$total.sem',
          date: '$total.date',
          isPresent: '$total.isPresent',
          totaldays: 1
        }
      },
      {
        $match: {
          isPresent: false
        }
      },
      {
        $group: {
          _id: '$sName',
          data: {
            $push: '$$ROOT'
          },
          absentdays: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          data: {
            $arrayElemAt: ['$data', 0]
          },
          absentdays: 1,
          totaldays: 1
        }
      },
      {
        $project: {
          sName: '$data.sName',
          dname: '$data.dname',
          batch: '$data.batch',
          sem: '$data.sem',
          totaldays: '$data.totaldays',
          absentdays: 1,
          absence_percentage: {
            $multiply: [
              {
                $divide: ['$absentdays', '$data.totaldays']
              },
              100
            ]
          }
        }
      },
      {
        $match: {
          absence_percentage: {
            $lte: 75
          }
        }
      }
    ];

    if (obj.batch) {
      pipeline.push({
        $match: {
          batch: obj.batch
        }
      });
    }

    if (obj.Sem) {
      pipeline.push({
        $match: {
          sem: obj.sem
        }
      });
    }

    if (obj.departmentName) {
      pipeline.push({
        $match: {
          dname: obj.dname
        }
      });
    }

    return Department.aggregate(pipeline);
  } catch (error) {
    throw customError(500, 'Error in 3rd: ' + error.message);
  }
};

export const aggregation4 = async (obj) => {
  try {
    const pipeline: any = [
      {
        $match: {
          batch: obj.batch
        }
      },
      {
        $group: {
          _id: '$batch',
          department: {
            $push: {
              initials: '$initials',
              data: {
                totalStudentsNow: '$occupiedSeats',
                totalStudentsIntake: '$availableSeats',
                availableIntake: {
                  $subtract: ['$availableSeats', '$occupiedSeats']
                }
              }
            }
          },
          totalStudentsNow: {
            $sum: '$occupiedSeats'
          },
          totalStudentsIntake: {
            $sum: '$availableSeats'
          }
        }
      },
      {
        $project: {
          _id: 0,
          batch: '$_id',
          data: {
            $map: {
              input: '$department',
              as: 'departmentData',
              in: {
                k: '$$departmentData.initials',
                v: '$$departmentData.data'
              }
            }
          },
          totalStudentsNow: 1,
          totalStudentsIntake: 1,
          availableIntake: {
            $subtract: ['$totalStudentsIntake', '$totalStudentsNow']
          }
        }
      },
      {
        $project: {
          batch: 1,
          department: {
            $arrayToObject: '$data'
          },
          totalStudentsNow: 1,
          totalStudentsIntake: 1,
          availableIntake: 1
        }
      }
    ];

    if (obj.department) {
      pipeline.unshift({
        $match: {
          name: obj.department
        }
      });
    }

    return await Department.aggregate(pipeline);
  } catch (error) {
    throw customError(500, 'Error in 4th: ' + error.message);
  }
};
