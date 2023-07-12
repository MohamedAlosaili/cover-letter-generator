// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { UserInfo } from "@/inputs";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAIStream from "@/utils/OpenAIStreamForServerless";
import fetchOpenAIAPI from "@/utils/fetchOpenAIAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response | void> {
  const { userInfo, API_KEY } = req.body as {
    userInfo: UserInfo;
    API_KEY?: string;
  };

  const response = await fetchOpenAIAPI(userInfo, API_KEY);

  await OpenAIStream(response, res);
}
