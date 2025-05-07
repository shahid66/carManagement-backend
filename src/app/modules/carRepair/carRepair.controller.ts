import catchAsync from "../../utils/catchAsync";


const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  });


  