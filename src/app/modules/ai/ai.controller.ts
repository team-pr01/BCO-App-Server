import httpStatus from "http-status";
import { AiServices } from "./ai.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const aiChat = catchAsync(async (req, res) => {
  const { message } = req.body;

  const result = await AiServices.aiChat(message);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AI response generated successfully",
    data: result,
  });
});

const translateNews = catchAsync(async (req, res) => {
  const translations = await AiServices.translateNews(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News translated and saved successfully",
    data: translations,
  });
});



export const AiControllers = {
  aiChat,
  translateNews,
};
