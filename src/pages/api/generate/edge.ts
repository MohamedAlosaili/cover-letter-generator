import type { UserInfo } from "@/inputs";
import { OpenAIStream } from "@/utils/OpenAIStreamForEdge";
import fetchOpenAIAPI from "@/utils/fetchOpenAIAPI";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response | void> {
  const { userInfo, API_KEY } = (await req.json()) as {
    userInfo: UserInfo;
    API_KEY?: string;
  };

  const response = await fetchOpenAIAPI(userInfo, API_KEY);

  const stream = await OpenAIStream(response);
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}
