import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import Session from "../session.json";
import { fetch } from "../fetch";

import { Request, Response, NextFunction } from "express";

export const generateTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, tone, number_of_tweets } = req.body;

    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: Session.accessToken,
      apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation",
      fetch,
    });

    const { text } = await api.sendMessage(
      `Write ${number_of_tweets} ${tone} tweet about ${content} within 280 characters each with hastags`
    );
    // console.log(text);
    const response = text.split("\n").filter((str) => str !== "");
    // const firstPoint = response[0];
    const answers: string[] = [];
    for (let i = 0; i < number_of_tweets; i++) {
      answers.push(response[i]);
    }
    return res.json({
      success: true,
      data: {
        // firstPoint,
        answers,
      },
      code: 200,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      debug: error.message,
      code: 500,
    });
  }
};
