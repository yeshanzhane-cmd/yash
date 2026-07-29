import { Router } from "express";
import { handleChatTurn } from "./chat.service";
import type { ChatRequestBody, ChatResponseBody } from "./chat.types";

export const chatRouter = Router();

chatRouter.post("/chat", async (req, res, next) => {
  try {
    const body = req.body as ChatRequestBody;
    const reply = await handleChatTurn(body);
    const response: ChatResponseBody = { reply };
    res.json(response);
  } catch (err) {
    next(err);
  }
});
